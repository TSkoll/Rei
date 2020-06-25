import Command from "../Command";
import CommandOptions from "../CommandOptions";
import { CommandMessage } from "../../../extensions/Message";

import Discord from "discord.js";
import CommandConstructor from "../CommandConstructor";
import Help from "../../Help/Help";

export default abstract class ReactionCommand extends Command {
  protected imageUrls: string[];

  constructor(imageUrls: string[], ctor?: CommandOptions) {
    super({ options: ctor });

    this.imageUrls = imageUrls;
  }

  public async run(message: CommandMessage, args: string[]) {
    const reaction = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
    const mention = message.mentions.members!.first();

    let embed = new Discord.MessageEmbed().setColor("RANDOM").setImage(reaction);

    await message.replyEmbed(embed);
  }
}
