import Command from "../types/command/Command";
import ReiClient from "../types/ReiClient";
import CommandLoader from "./CommandLoader";

export default class CommandHandler {
  private commands?: { [name: string]: { command: Command; parent?: string } };

  public async init(client: ReiClient) {
    const commands = await CommandLoader.load(client);

    this.commands = commands;
  }

  public getCommand(name: string): Command {
    if (!this.commands) throw "This commandhandler has not been initialized!";

    const cmd = this.commands[name];

    if (cmd) return cmd.command;
    else throw "This command doesn't exist!";
  }

  public getCommandNames(): string[] {
    if (!this.commands) throw "This commandhandler has not been initialized!";
    return [];
    // TODO: fix
    //return Object.keys(this.commands).filter(x => !(this.commands![x].parent || this.commands![x].command.isHidden()));
  }
}
