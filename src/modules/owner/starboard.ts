import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../../types/ReiClient";
import Logger from "../../core/Logger";
import { TextChannel } from "discord.js";

export default class Starboard extends Command {
  constructor() {
    super({
      options: {
        ownerOnly: true,
        hidden: true,
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    await message.replyBasicInfo("This command currently only has afterinit functionality!");
  }

  public async afterInit(client: ReiClient) {
    /*
      This is a hacky solution to add reaction handling support to a command
      if a new need for reactions appear, this functionality should be generalized
      to a ReactionHandler and have commands subscribe to that.
    */
    client.on("messageReactionAdd", async (reaction, user) => {
      const channel = reaction.message.channel;
      if (channel.type == "text" && channel.id == "724715692804407346" && reaction.emoji.identifier == "%E2%AD%90") {
        const sendChannel = (await client.channels.fetch("728915959024320513", true)) as TextChannel;
        if (sendChannel && reaction.message.embeds[0]) await sendChannel.send(reaction.message.embeds[0]);
      }
    });
  }
}
