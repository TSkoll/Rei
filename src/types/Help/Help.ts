import ManualHelpText from "./ManualHelpText";
import Command from "../Command/Command";
import SubCommand from "../Command/SubCommand/SubCommand";
import HelpText from "./HelpText";

export default class Help {
  public helpMap = new Map<string, HelpText>();
  public readonly root: string;

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

  public getBranches(path: string): string[] {
    const ret: string[] = [];
    const paths = this.helpMap.forEach((v, k) => {
      if (k.startsWith(path)) {
        const branch = k
          .replace(path, "")
          .substring(1)
          .substring(0, k.indexOf("/") + 1);

        if (!(v.aliases && v.aliases.includes(branch))) ret.push(branch);
      }
    });

    return ret.filter(x => x != "");
  }

  public getBase(): HelpText {
    // If this object exists, so does the root object
    return this.helpMap.get(this.root)!;
  }
}
