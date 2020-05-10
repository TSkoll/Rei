import SubCommand from "../../../types/SubCommand";
import { CommandMessage } from "../../../extensions/Message";

export default class Remove implements SubCommand {
  aliases = ["clear"];

  public async run(message: CommandMessage, args: string[]) {
    const member = message.member!;
    const serverColorRoles = member.guild.roles.cache.filter(x => x.name[0] == "#");

    await member.roles.remove(serverColorRoles);
    await message.replyBasicSuccess("Color removed!");
  }
}
