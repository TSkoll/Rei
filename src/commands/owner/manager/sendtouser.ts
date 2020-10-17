import { GuildMember } from "discord.js";
import { CommandMessage } from "../../../extensions/Message";
import BasicCommand from "../../../types/command/impl/BasicCommand";

export default class SendTo extends BasicCommand {
  constructor() {
    super({
      description: "Sends [messageToSend] to the specified [user].",
      args: {
        user: {
          description: "User that is on the server where this command is invoked on.",
          type: GuildMember,
        },
        messageToSend: {
          description: "Content of the message.",
          type: String,
        },
      },
      flags: {
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
