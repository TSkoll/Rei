import SubCommandManager from "../../../core/subcommand/SubCommandManager";
import Command from "../Command";
import CommandConstructor from "../CommandConstructor";

export default abstract class HostCommand extends Command {
  public manager?: SubCommandManager;

  constructor(options?: CommandConstructor) {
    super(options);
  }
}
