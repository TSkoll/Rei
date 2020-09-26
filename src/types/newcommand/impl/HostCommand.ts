import Command from "../Command";
import CommandConstructor from "../CommandConstructor";

export default abstract class HostCommand implements Command {
  constructor(options?: CommandConstructor) {}

  public abstract async run(): Promise<void>;

  public abstract async afterInit?(client: ReiClient): Promise<void>;
}
