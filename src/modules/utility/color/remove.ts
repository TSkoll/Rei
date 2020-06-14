import SubCommand from "../../../types/Command/SubCommand/SubCommand";
import { CommandMessage } from "../../../extensions/Message";

export default class Remove extends SubCommand {
  constructor() {
    super({
      options: {
        aliases: ["clear"],
      },
      help: {
        description: "Clears your current color.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    const member = message.member!;
    const serverColorRoles = member.guild.roles.cache.filter(x => x.name[0] == "#");

    await member.roles.remove(serverColorRoles);
    await message.replyBasicSuccess("Color removed!");
  }
}
