import { PermissionResolvable } from "discord.js";

export default abstract class ExecutionFlags {
  public ownerOnly?: boolean = false;
  public singleArg?: boolean = false;
  public ignoreMin?: number = 0;
  public botPerms?: PermissionResolvable[] = undefined;
  public userPerms?: PermissionResolvable[] = undefined;
  public disallowDM?: boolean = false;
  public nsfw?: boolean = false;
  public aliases?: string[] = undefined;
  public ratelimit?: number = 0;
  public hidden?: boolean = false;
}
