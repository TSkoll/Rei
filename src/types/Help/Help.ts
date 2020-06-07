import HelpText from "./HelpText";

export default class Help {
  public helpMap = new Map<string, HelpText>();
  private root?: string;

  constructor(helpText?: HelpText) {
    if (helpText) {
      this.helpMap.set(helpText.name, helpText);
      this.root = helpText.name;
    }
  }

  public addSub(name: string, helpText: HelpText) {
    if (this.root) {
      this.helpMap.set(`${this.root}/${name}`, helpText);
    } else throw `Unable to add sub-help objects if root help object does not exist!`;
  }

  public addExtended(helpMap: Map<string, HelpText>) {
    if (this.root) {
      helpMap.forEach((v, k) => {
        this.helpMap.set(`${this.root}/${k}`, v);
      });
    } else throw `Unable to add sub-help objects if root help object does not exist!`;
  }
}
