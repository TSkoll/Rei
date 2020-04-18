import { CommandMessage } from "../extensions/Message";
import CommandOptions from "./CommandOptions";

export default abstract class Command extends CommandOptions {
  constructor(options?: CommandOptions) {
    super(options);
  }

  public abstract async run(message: CommandMessage, args: string[]): Promise<void>;

  public async afterInit?(): Promise<void>;
}
