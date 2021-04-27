import { DMChannel, MessageEmbed } from "discord.js";
import { CommandMessage } from "../../extensions/Message";
import { general } from "../../templates/help";
import Command from "../../types/command/Command";
import BasicCommand from "../../types/command/impl/BasicCommand";
import HostCommand from "../../types/command/impl/HostCommand";
import ReiClient from "../../types/ReiClient";

export default class Help extends BasicCommand {
  constructor() {
    super({
      args: {
        command: {
          description: "Command to get help out of.",
          type: "RestString",
        },
      },
    });
  }

  public async run(message: CommandMessage, { command }: { command: String }) {
    if (!command) {
      if (!(message.channel instanceof DMChannel)) message.replyBasicInfo("DM sent!");
      return await message.author.send(general(message.reiClient));
    }

    const reiClient = message.reiClient;
    const split = command.split(" ");
    const firstCommand = reiClient.commandHandler.getCommand(split.shift() ?? "");

    let cmd: Command = firstCommand;
    if (firstCommand instanceof HostCommand) cmd = firstCommand.manager?.findCommand(split)?.command ?? firstCommand;

    if (cmd) await message.replyEmbed(this.constructHelpEmbed(cmd, reiClient));
  }

  private getReadablePath(current: string[], next?: Command): string[] {
    if (next) {
      current.unshift(next.constructor.name.toLowerCase());
      return this.getReadablePath(current, next?.parent);
    } else return current;
  }

  private constructHelpEmbed(command: Command, client: ReiClient) {
    const commandPath = this.getReadablePath([], command);
    const commandString = commandPath.join(" ");

    const args = Object.keys(command.help.args ?? []);
    const subCommands = command instanceof HostCommand ? command.manager?.getCommandNames() : undefined;

    let embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(commandString)
      .setDescription(command?.help.description ?? "This command doesn't seem to have a description")
      .setFooter(
        this.constructUsageString(command.constructor.name, client.prefixHandler.defaultPrefix, args, subCommands)
      );

    if (command.flags.aliases) embed.addField("Aliases", command.flags.aliases.join(", "), true);
    if (subCommands)
      embed.addField("Subcommands", subCommands.map(cmd => `- ${cmd}`).join("\n") ?? "No subcommands", true);
    if (command.help.args)
      embed.addField(
        "Arguments",
        args.map(arg => `**${arg}** => ${command.help.args![arg].description ?? "No description for this argument."}`),
        false
      );
    if (command.help.examples) {
      embed.addField(
        "Examples",
        command.help.examples.map(example => `${client.prefixHandler.defaultPrefix}${commandString} ${example}`),
        false
      );
    }

    return embed;
  }

  private constructUsageString(commandName: string, defaultPrefix: string, args?: string[], subcommands?: string[]) {
    // Copy array to avoid mutating input
    const temp = args?.slice();
    if (temp && subcommands) temp[0] = [temp[0], ...subcommands].join("|");
    const argsString = (temp ?? []).map(arg => `[${arg}]`).join(" ");
    return `${defaultPrefix}${commandName.toLowerCase()} ${argsString}`;
  }
}
