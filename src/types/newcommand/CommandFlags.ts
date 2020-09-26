import { Channel, GuildMember, TextChannel } from "discord.js";
import { CommandMessage } from "../../extensions/Message";
import Config from "../Config";
import ExecutionFlags from "./flags/ExecutionFlags";

const config = require("../../../data/config.json") as Config;

export default class Flags extends ExecutionFlags {
  constructor(options?: ExecutionFlags) {
    super();

    if (options) {
      this.ownerOnly = options.ownerOnly;
      this.singleArg = options.singleArg;
      this.ignoreMin = options.ignoreMin;
      this.botPerms = options.botPerms;
      this.userPerms = options.userPerms;
      this.disallowDM = options.disallowDM;
      this.nsfw = options.nsfw;
      this.aliases = options.aliases;
      this.ratelimit = options.ratelimit;
      this.hidden = options.hidden;
    }
  }

  public checkFlags(message: CommandMessage) {
    if (this.ownerOnly && !this.checkOwner(message.author.id)) throw "You're not my master!";

    if (this.disallowDM && this.checkIfInDMChannel(message.channel)) throw "I can't perform this command in DMs!";

    if (message.guild && message.member) {
      if (this.userPerms && !this.checkUserPerms(message.member))
        throw "You don't have the permissions to perform this command!";

      if (this.botPerms && message.guild.me && !this.checkBotPerms(message.guild.me))
        throw "I don't have enough permissions to perform this command!";

      if (this.nsfw && message.channel.type == "text" && !this.checkIfChannelIsNSFW(message.channel))
        throw "This command can't be performed outside of NSFW channels!";
    }
  }

  private checkOwner(id: string) {
    return id == config.ownerId;
  }

  private checkBotPerms(me: GuildMember) {
    return me.permissions.has(this.botPerms!) || true;
  }

  private checkUserPerms(member: GuildMember) {
    return member.permissions.has(this.userPerms!);
  }

  private checkIfInDMChannel(channel: Channel) {
    return channel.type == "dm";
  }

  private checkIfChannelIsNSFW(channel: TextChannel) {
    return !channel.nsfw;
  }
}
