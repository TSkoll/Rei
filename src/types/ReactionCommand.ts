import Command from "./Command";
import CommandOptions from "./CommandOptions";
import { CommandMessage } from "../extensions/Message";

import Discord from "discord.js";

export default abstract class ReactionCommand extends Command {
  protected imageUrls: string[];
  protected reactionMessage?: string;

  constructor(imageUrls: string[], reactionMessage: string, commandOptions: CommandOptions) {
    super(commandOptions);

    this.imageUrls = imageUrls;
    this.reactionMessage = reactionMessage;
  }

  public async run(message: CommandMessage, args: string[]) {
    const reaction = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
    const mention = message.mentions.members!.first();

    let embed = new Discord.MessageEmbed().setColor("RANDOM").setImage(reaction);

    if (mention && this.reactionMessage)
      embed = embed.setDescription(
        this.reactionMessage.replace("%target%", mention.user.username).replace("%user%", message.author.username)
      );

    await message.replyEmbed(embed);
  }
}
