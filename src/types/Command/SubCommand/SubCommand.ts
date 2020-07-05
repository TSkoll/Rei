import { CommandMessage } from "../../../extensions/Message";
import SubCommandOptions from "./SubCommandOptions";
import ManualHelpText from "../../Help/ManualHelpText";
import Help from "../../Help/Help";
import SubCommandConstructor from "./SubCommandConstructor";
import Command from "../Command";

export default abstract class SubCommand extends SubCommandOptions {
  public helpText?: ManualHelpText;
  public help?: Help;
  public parent: Command | SubCommand;

  constructor(parent: Command | SubCommand, ctor: SubCommandConstructor) {
    super(ctor.options);
    this.parent = parent;

    if (ctor.help) {
      this.helpText = ctor.help;
      this.help = new Help(this, ctor.help);

      if (parent.help) {
        parent.help.addSub(this, this.helpText);
        if (this.help.helpMap.size > 0) parent.help.addExtended(this.help.helpMap);
        if (this.aliases) this.aliases.map(alias => parent.help!.addSub(this, this.helpText!, alias));
      }
    }
  }

  abstract run(message: CommandMessage, args: string[]): Promise<void>;
}

export interface SubCommandFactory extends SubCommandOptions {
  helpText?: ManualHelpText;

  new (parent: Command | SubCommand, ctor: SubCommandConstructor): SubCommand;
}

export function constructSubCmd(parent: Command | SubCommand, subcommands: SubCommandFactory[]) {
  return subcommands.map(
    subcmd =>
      new subcmd(parent, {
        help: subcmd.helpText,
        options: {
          aliases: subcmd.aliases,
        },
      })
  );
}
