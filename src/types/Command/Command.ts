import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../ReiClient";
import { ParseType } from "./argument/ArgumentInstructions";
import CommandConstructor from "./CommandConstructor";
import Flags from "./CommandFlags";
import Help from "./CommandHelp";

export default abstract class Command {
  public flags: Flags;

  public types: { [name: string]: ParseType };
  public parent?: Command; // If parent exists, the command is considered to be a subcommand
  public help: Help;

  constructor(options?: CommandConstructor) {
    this.flags = new Flags(options?.flags ?? undefined);
    this.help = new Help(options?.description, options?.args);
    if (options?.args) {
      const types: { [key: string]: ParseType } = {};
      Object.keys(options.args).map(arg => {
        types[arg] = options.args![arg].type;
      });
      this.types = types;
    } else this.types = {};
  }

  public async pre(message: CommandMessage) {
    this.flags.check(message);
  }

  public abstract async run(message: CommandMessage, args: object): Promise<any>;

  public async afterInit?(client: ReiClient): Promise<any>;
}
