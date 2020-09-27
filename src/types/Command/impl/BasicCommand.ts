import { ParseType } from "../argument/ArgumentInstructions";
import Command from "../Command";
import CommandConstructor from "../CommandConstructor";

export default abstract class BasicCommand extends Command {
  private args?: { [name: string]: ParseType };

  constructor(options?: CommandConstructor) {
    // Base Command handles flags
    super(options);
  }
}
