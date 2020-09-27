import Command from "../../types/command/Command";
import HostCommand from "../../types/command/impl/HostCommand";

export default class SubCommandManager {
  private subCmdMap: { [name: string]: Command } = {};

  constructor(SubCommands: Command[]) {
    for (const Command of SubCommands) {
      const name = Command.constructor.name.toLowerCase();

      this.subCmdMap[name] = Command;

      if (Command.flags.aliases) for (let alias of Command.flags.aliases) this.subCmdMap[alias.toLowerCase()] = Command;
    }
  }

  public getCommand(name: string): Command {
    const cmd = this.subCmdMap[name];
    if (!cmd) throw "Subcommand could not be found!";
    return cmd;
  }

  public findCommand(args: string[]): { command: Command; args: string[]; path: string[] } {
    let path = [];
    let curRet: Command | null = null;
    for (const arg of args) {
      if (!curRet) {
        curRet = this.getCommand(arg);
        path.push(arg);
        continue;
      }

      if (curRet instanceof HostCommand) {
        if (!curRet.manager) throw "Path contains a HostCommand with a malfunctioning manager!";

        curRet = curRet.manager.getCommand(arg);
        path.push(arg);
      }
    }

    if (curRet == null) throw "No command could be found!";
    return { command: curRet, args: args.slice(path.length), path };
  }
}
