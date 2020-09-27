import Command from "../Command";
import CommandConstructor from "../CommandConstructor";

export default abstract class BasicCommand extends Command {
  constructor(options?: CommandConstructor) {
    // Base Command handles flags
    super(options);
  }
}
