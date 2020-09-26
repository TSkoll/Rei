import { CommandMessage } from "../../../extensions/Message";
import SubCommand from "./SubCommand";

export default class SubCommandManager {
  private subCmdMap: { [name: string]: SubCommand } = {};

  constructor(SubCommands: SubCommand[]) {
    for (let Command of SubCommands) {
      let name = Command.constructor.name.toLowerCase();

      this.subCmdMap[name] = Command;

      if (Command.aliases) for (let alias of Command.aliases) this.subCmdMap[alias.toLowerCase()] = Command;
    }
  }

  public async runSubCommand(message: CommandMessage, args: string[]) {
    if (!args[0]) return await this.noArgs(message);

    const cmd = this.subCmdMap[args[0]];

    if (!cmd) return await this.default(message, args);

    await cmd.run(message, args.slice(1));
  }

  public async noArgs(message: CommandMessage) {
    await message.replyBasicInfo(`Available subcommands:\n\n${Object.keys(this.subCmdMap).join("\n")}`);
  }

  public async default(message: CommandMessage, args: string[]) {
    throw "Subcommand not found!";
  }
}
