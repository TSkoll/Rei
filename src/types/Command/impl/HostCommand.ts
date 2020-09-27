import Command from "../Command";
import CommandConstructor from "../CommandConstructor";

export default abstract class HostCommand extends Command {
  constructor(options?: CommandConstructor) {
    super(options);
  }
}
