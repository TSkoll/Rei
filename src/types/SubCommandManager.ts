import SubCommand, { constructSubCmd } from "./SubCommand";
import { CommandMessage } from "../extensions/Message";

export default class SubCommandManager {
  private subCmdMap: { [name: string]: SubCommand } = {};

  constructor(SubCommands: SubCommand[]) {
    for (let Command of SubCommands) {
      let name = Command.constructor.name.toLowerCase();
      this.subCmdMap[name] = Command;

      if (Command.aliases) {
        for (let alias of Command.aliases) this.subCmdMap[alias.toLowerCase()] = Command;
      }
    }
  }

  public async runSubCommand(name: string, args: string[], message: CommandMessage) {
    const cmd = this.subCmdMap[name];

    if (!cmd) throw "Subcommand not found!";

    await cmd.run(message, args);
  }
}
