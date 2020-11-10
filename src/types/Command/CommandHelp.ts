import CommandArgs from "./CommandArgs";

export default class Help {
  public readonly description?: string;
  public readonly args?: {
    [key: string]: {
      description?: string;
    };
  };

  constructor(description?: string, args?: { [key: string]: CommandArgs }) {
    if (description) this.description = description;
    if (args) {
      this.args = {};
      Object.keys(args).map(arg => {
        this.args![arg] = {};
        this.args![arg].description = args[arg].description;
      });
    }
  }
}
