import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import { MessageEmbed } from "discord.js";

import fetch from "node-fetch";

export default class Help extends Command {
  constructor() {
    super({
      help: {
        description: "DMs user an information dump or presents information about a specific command.",
        args: {
          command: {
            description: "Specific command (or subcommand), used to present information about the command itself.",
          },
        },
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    if (args.length == 0) return await message.author.send(new MessageEmbed().setImage(await this.getRandomCat()));

    const cmdHandler = message.reiClient.commandHandler;
    const baseCmd = args[0].toLowerCase();

    const cmd = cmdHandler.getCommand(baseCmd);
    if (cmd.help) {
      const root = cmd.help.root;
      const path = args.slice(1);
      const mid = args.slice(0, args.length - 2);
      const rest = path.join("/");

      const cmdPath = rest.length > 0 ? `${root}/${rest}` : root;

      const helpText = cmd.help.helpMap.get(cmdPath);
      if (!helpText) throw "There doesn't seem to be any information regarding this!";

      const branches = cmd.help.getBranches(cmdPath);
      const branchesExist = branches.length > 0;

      const branchesAndArgs = [...branches, ...(helpText.args ? Object.keys(helpText.args) : [])];

      const readablePath = `${rest.length != 0 ? `${root} ` : ""}${mid.length > 0 ? ` ${mid.join(" ")}` : ""}[${[
        helpText.name,
        ...(helpText.aliases ? helpText.aliases : []),
      ].join("|")}]`;
      const readableTitle = `${rest.length != 0 ? `${root}/` : ""}${mid.length > 0 ? ` ${mid.join("/")}` : ""}${
        helpText.name
      }`;
      const usageText = `Usage: ${message.prefix}${readablePath}${
        branchesAndArgs.length > 0 ? ` [${branchesAndArgs.join("|")}]` : ""
      }`;

      const embed = new MessageEmbed().setColor("BLUE").setTitle(readableTitle).setDescription(helpText.description);
      if (helpText.aliases) embed.addField("Aliases", helpText.aliases.map(x => `- ${x}`).join("\n"), branchesExist);
      if (branchesExist) embed.addField("subcommands", branches.map(x => `- ${x}`).join("\n"), true);
      if (helpText.args)
        embed.addField(
          "Arguments",
          Object.keys(helpText.args)
            .map(k => `**${k}** => ${helpText.args![k].description}`)
            .join("\n\n")
        );
      embed.setFooter(usageText);

      await message.replyEmbed(embed);
    } else throw "That command does have help information attached to it!";
  }

  private async getRandomCat(): Promise<string> {
    return (await fetch("https://api.thecatapi.com/v1/images/search").then(resp => resp.json()))[0].url;
  }
}
