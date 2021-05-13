import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../../types/ReiClient";
import Logger from "../../core/Logger";
import { TextChannel } from "discord.js";

export default class Starboard extends Command {
  private starEmoji: string = "%E2%AD%90";
  private starboardGuild: string = "724661988768350239";
  private lookupChannel: string = "724715692804407346";
  private postChannel: string = "728915959024320513";

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
    // The "messageReactionAdd" event is only triggered
    // on cached message for cached guild members
    const guild = await client.guilds.fetch(this.starboardGuild, true);
    await guild.members.fetch();

    /*
      This is a hacky solution to add reaction handling support to a command
      if a new need for reactions appear, this functionality should be generalized
      to a ReactionHandler and have commands subscribe to that.
    */
    client.on("messageReactionAdd", async (reaction, user) => {
      const channel = reaction.message.channel;
      if (channel instanceof TextChannel && channel.id == this.lookupChannel) {
        Logger.info("Reaction on a starboard channel", {
          identifier: reaction.emoji.identifier,
          name: reaction.emoji.name,
          by: user.username,
        });

        if (reaction.emoji.identifier == this.starEmoji) {
          const sendChannel = (await client.channels.fetch(this.postChannel, true)) as TextChannel;
          if (sendChannel && reaction.message.embeds[0]) {
            await sendChannel.send(reaction.message.embeds[0]);
            client.starboardReactions++;
          }
        }
      }
    });
  }
}
