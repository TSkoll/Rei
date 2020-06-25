import { GuildMember, Channel, TextChannel } from "discord.js";

import { CommandMessage } from "../../extensions/Message";
import CommandOptions from "./CommandOptions";
import Config from "../Config";
import Help from "../Help/Help";
import CommandConstructor from "./CommandConstructor";

const config = require("../../../data/config.json") as Config;

export default abstract class Command extends CommandOptions {
  public help?: Help;

  constructor(ctor?: CommandConstructor) {
    super(ctor && ctor.options ? ctor.options : undefined);
    if (ctor && ctor.help) this.help = new Help(this, ctor.help);
  }

  public isHidden() {
    return this.hidden || false;
  }

  public checkPermissions(message: CommandMessage) {
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

  // Never capture the response of run, but allow returning from command
  // so execution can be stopped easily
  public abstract async run(message: CommandMessage, args: string[] | string): Promise<any>;

  public async afterInit?(): Promise<any>;
}
