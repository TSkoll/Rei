import SubCommandManager from "../../../core/subcommand/SubCommandManager";
import { CommandMessage } from "../../../extensions/Message";
import Command from "../Command";
import CommandConstructor from "../CommandConstructor";

export default abstract class HostCommand extends Command {
  public manager?: SubCommandManager;

  constructor(options?: CommandConstructor) {
    super(options);
  }

  public async run(message: CommandMessage, args: object): Promise<void> {
    throw "Subcommand not found!";
  }
}
