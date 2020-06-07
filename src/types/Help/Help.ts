import ManualHelpText from "./ManualHelpText";
import Command from "../Command/Command";
import SubCommand from "../Command/SubCommand";
import HelpText from "./HelpText";

export default class Help {
  public helpMap = new Map<string, HelpText>();
  private root: string;

  constructor(cmd: Command | SubCommand, manual: ManualHelpText) {
    const pathName = cmd.constructor.name.toLowerCase();
    this.helpMap.set(pathName, this.toHelpText(cmd, manual));
    this.root = pathName;
  }

  private toHelpText(cmd: Command | SubCommand, manual: ManualHelpText) {
    return {
      ...manual,
      name: cmd.constructor.name.toLowerCase(),
      aliases: cmd.aliases,
    };
  }

  public addSub(cmd: Command | SubCommand, manual: ManualHelpText, name?: string) {
    const pathName = name || cmd.constructor.name.toLowerCase();
    this.helpMap.set(`${this.root}/${pathName}`, this.toHelpText(cmd, manual));
  }

  public addExtended(helpMap: Map<string, HelpText>) {
    helpMap.forEach((v, k) => {
      this.helpMap.set(`${this.root}/${k}`, v);
    });
  }
}
