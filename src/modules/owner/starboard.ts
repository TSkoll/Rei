import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../../types/ReiClient";
import Logger from "../../core/Logger";
import { MessageEmbed, TextChannel } from "discord.js";

import { PubSub } from "@google-cloud/pubsub";

export default class Starboard extends Command {
  private starEmoji: string = "%E2%AD%90";
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
    /*
      This is a hacky solution to add reaction handling support to a command
      if a new need for reactions appear, this functionality should be generalized
      to a ReactionHandler and have commands subscribe to that.
    */
    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.partial) {
        try {
          await reaction.fetch();
        } catch (error) {
          Logger.error("An error occured while fetching a partial reaction", error);
          return;
        }
      }

      if (reaction.message.partial) {
        try {
          await reaction.message.fetch();
        } catch (error) {
          Logger.error("An error occured while fetching a partial starboard message", error);
          return;
        }
      }

      const channel = reaction.message.channel;
      if (channel instanceof TextChannel && channel.id == this.lookupChannel) {
        Logger.info("Reaction on a starboard channel", {
          identifier: reaction.emoji.identifier,
          name: reaction.emoji.name,
          by: user.username,
        });

        const firstReaction = reaction.count && reaction.count < 2;
        if (reaction.emoji.identifier == this.starEmoji && firstReaction) {
          const sendChannel = (await client.channels.fetch(this.postChannel, true)) as TextChannel;
          if (sendChannel && reaction.message.embeds[0]) {
            await sendChannel.send(reaction.message.embeds[0]);
            client.starboardReactions++;
            await postToPubSub(reaction.message.embeds[0], user.id);
          }
        }
      }
    });
  }
}

async function postToPubSub(embed: MessageEmbed, by: string) {
  const content = {
    name: embed.author?.name ?? "unknown",
    url: embed.image?.url ?? null,
    starredBy: by,
    directLink: embed.author?.url ?? null,
  };

  const buffer = Buffer.from(JSON.stringify(content));

  const pubsub = new PubSub({ projectId: "hentsu" });
  try {
    await pubsub.topic("starboard").publish(buffer);
  } catch (err: any) {
    Logger.error("Failed to publish to PubSub: " + err.message);
  }
}
