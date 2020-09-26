import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../ReiClient";
import ExecutionFlags from "./flags/ExecutionFlags";

export default abstract class Command {
  constructor(options?: ExecutionFlags) {}

  public abstract async run(message: CommandMessage, args: object): Promise<void>;

  public abstract async afterInit?(client: ReiClient): Promise<void>;
}
