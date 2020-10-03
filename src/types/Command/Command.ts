import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../ReiClient";
import { ParseType } from "./argument/ArgumentInstructions";
import CommandConstructor from "./CommandConstructor";
import Flags from "./CommandFlags";

export default abstract class Command {
  public flags: Flags;

  public types: { [name: string]: ParseType };
  public parent?: Command; // If parent exists, the command is considered to be a subcommand

  constructor(options?: CommandConstructor) {
    this.flags = new Flags(options?.flags ?? undefined);
    if (options?.args) {
      const types: { [key: string]: ParseType } = {};
      Object.keys(options.args).map(x => {
        types[x] = options.args![x].type;
      });
      this.types = types;
    } else this.types = {};
  }

  public async pre(message: CommandMessage) {
    this.flags.check(message);
  }

  public abstract async run(message: CommandMessage, args: object): Promise<void>;

  public async afterInit?(client: ReiClient): Promise<void>;
}
