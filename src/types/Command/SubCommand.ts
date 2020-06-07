import { CommandMessage } from "../../extensions/Message";
import SubCommandOptions from "./SubCommandOptions";
import HelpText from "../Help/HelpText";
import Help from "../Help/Help";
import SubCommandConstructor from "./SubCommandConstructor";

export default abstract class SubCommand extends SubCommandOptions {
  public helpText?: HelpText;
  public help: Help;

  constructor(ctor: SubCommandConstructor) {
    super(ctor.options);
    this.help = new Help(ctor.help);
  }

  abstract run(message: CommandMessage, args: string[]): Promise<void>;
}

export interface SubCommandFactory extends SubCommandOptions {
  helpText?: HelpText;

  new (ctor: SubCommandConstructor): SubCommand;
}

export function constructSubCmd(subcommands: SubCommandFactory[]) {
  return subcommands.map(
    subcmd =>
      new subcmd({
        help: subcmd.helpText,
        options: {
          aliases: subcmd.aliases,
        },
      })
  );
}
