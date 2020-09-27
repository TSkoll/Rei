import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../ReiClient";
import CommandConstructor from "./CommandConstructor";
import Flags from "./CommandFlags";

export default abstract class Command {
  private flags: Flags;

  constructor(options?: CommandConstructor) {
    this.flags = new Flags(options?.flags ?? undefined);
  }

  public async pre(message: CommandMessage) {
    this.flags.check(message);
  }

  public abstract async run(message: CommandMessage, args: object): Promise<void>;

  public async afterInit?(client: ReiClient): Promise<void>;
}
