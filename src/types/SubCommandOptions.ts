export default abstract class SubCommandOptions {
  public aliases?: string[] = undefined;

  constructor(options?: SubCommandOptions) {
    if (options) {
      this.aliases = options.aliases;
    }
  }
}
