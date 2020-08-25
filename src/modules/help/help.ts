import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import { MessageEmbed } from "discord.js";

import fetch from "node-fetch";
import ReiClient from "../../types/ReiClient";

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
    if (args.length == 0) {
      await message.author.send(this.generalBlurb(message.reiClient));
      await message.replyBasicInfo("DM sent!");
      return;
    }

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
      const usageText = `Usage: ${message.serverPrefix}${readablePath}${
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

  private generalBlurb(reiClient: ReiClient): string {
    const defaultPrefix = reiClient.config.defaultPrefix;
    const cmdNames = reiClient.commandHandler.getCommandNames();

    const start =
      "Hey there, I'm Rei!\nI'm here to enhance your server!\n\nInvite me to your discord server: <https://discordapp.com/oauth2/authorize?client_id=278819964851322880&scope=bot&permissions=2146958591>";

    const generalHelp = `Got ideas or suggenstions? Use \`${defaultPrefix}feedback (suggestion)\` to let the developers know!\nNeed help or have an issue? Let us know over at <https://github.com/TSkoll/Rei>`;

    const commandsList = `Commands (**default prefix: "${defaultPrefix}"**):\n${cmdNames.join(
      "\n"
    )}\n\nFor more information, please use \`${defaultPrefix}help (command)\``;

    return `${start}\n\n${generalHelp}\n\n${commandsList}`;
  }
}
