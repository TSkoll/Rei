import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";

import { TextChannel } from "discord.js";

export default class Feedback extends Command {
  private feedbackChannelId = "396583338116120576";

  async run(message: CommandMessage, args: string[]) {
    const client = message.client;
    const feedbackChannel = (await client.channels.fetch(this.feedbackChannelId)) as TextChannel;

    await feedbackChannel.send(
      `${message.author.username}#${message.author.discriminator} [${message.author.id}]\n\`\`\`${args}\`\`\``
    );
    await message.replyBasicSuccess("Feedback left!");
  }
}
