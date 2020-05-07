import { CommandMessage } from "../extensions/Message";
import SubCommandOptions from "./SubCommandOptions";

export default interface SubCommand extends SubCommandOptions {
  run(message: CommandMessage, args: string[]): Promise<void>;
}

export interface SubCommandConstructor extends SubCommandOptions {
  new (options?: SubCommandOptions): SubCommand;
}

export function constructSubCmd(subcommands: SubCommandConstructor[]) {
  return subcommands.map(subcmd => new subcmd({ aliases: subcmd.aliases }));
}
