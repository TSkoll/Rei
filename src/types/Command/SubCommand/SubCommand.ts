import { CommandMessage } from "../../../extensions/Message";
import SubCommandOptions from "./SubCommandOptions";
import ManualHelpText from "../../Help/ManualHelpText";
import Help from "../../Help/Help";
import SubCommandConstructor from "./SubCommandConstructor";

export default abstract class SubCommand extends SubCommandOptions {
  public helpText?: ManualHelpText;
  public help?: Help;

  constructor(ctor: SubCommandConstructor) {
    super(ctor.options);

    if (ctor.help) {
      this.helpText = ctor.help;
      this.help = new Help(this, ctor.help);
    }
  }

  abstract run(message: CommandMessage, args: string[]): Promise<void>;
}

export interface SubCommandFactory extends SubCommandOptions {
  helpText?: ManualHelpText;

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
