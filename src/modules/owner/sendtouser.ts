import { GuildMember } from "discord.js";
import { CommandMessage } from "../../extensions/Message";
import BasicCommand from "../../types/command/impl/BasicCommand";

export default class SendTo extends BasicCommand {
  constructor() {
    super({
      types: {
        user: GuildMember,
        messageToSend: String,
      },
      options: {
        ownerOnly: true,
        singleArg: true,
        hidden: true,
      },
    });
  }

  public async run(message: CommandMessage, { user, messageToSend }: { user: GuildMember; messageToSend: string }) {
    await user.send(messageToSend);
    await message.replyBasicSuccess("Message sent!");
  }
}
