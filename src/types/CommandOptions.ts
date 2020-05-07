import { PermissionResolvable } from "discord.js";

export default abstract class CommandOptions {
  public ownerOnly?: boolean = false;
  public argsCount?: number = 0;
  public ignoreMin?: number = 0;
  public botPerms?: PermissionResolvable[] = undefined;
  public userPerms?: PermissionResolvable[] = undefined;
  public disallowDM?: boolean = false;
  public nsfw?: boolean = false;
  public aliases?: string[] = undefined;
  public ratelimit?: number = 0;

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
