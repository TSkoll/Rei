import { PermissionResolvable } from "discord.js";

export default abstract class CommandOptions {
  protected ownerOnly: boolean = false;
  protected argsCount: number = 0;
  protected ignoreMin: number = 0;
  protected botPerms?: PermissionResolvable[] = undefined;
  protected userPerms?: PermissionResolvable[] = undefined;
  protected disallowDM: boolean = false;
  protected nsfw: boolean = false;
  protected aliases?: string[] | string = undefined;
  protected ratelimit: number = 0;

  constructor(options?: CommandOptions) {
    if (options) {
      this.ownerOnly = options.ownerOnly;
      this.argsCount = options.argsCount;
      this.ignoreMin = options.ignoreMin;
      this.botPerms = options.botPerms;
      this.userPerms = options.userPerms;
      this.disallowDM = options.disallowDM;
      this.nsfw = options.nsfw;
      this.aliases = options.aliases;
      this.ratelimit = options.ratelimit;
    }
  }
}
