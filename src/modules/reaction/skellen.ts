import ReactionCommand from "../../types/ReactionCommand";
import { CommandMessage } from "../../extensions/Message";

import Discord from "discord.js";

export default class Skellen extends ReactionCommand {
  reactionMessage = "Good boy <@136482621298442240>";
  imageUrls = [
    "https://i.imgur.com/FoKYpLO.gif",
    "https://i.imgur.com/cDEudw8.gif",
    "https://i.imgur.com/iQba6l1.gif",
    "https://i.imgur.com/gbQz1D2.gif",
    "https://i.imgur.com/duRoGrN.gif",
    "https://i.imgur.com/QPx80fA.gif",
    "https://i.imgur.com/eIj17CJ.gif",
    "https://i.imgur.com/0ApeXxA.gif",
    "https://i.imgur.com/mUYlaCK.gif",
    "https://i.imgur.com/GXD7S1W.gif",
    "https://i.imgur.com/gAGqDKi.gif",
    "https://i.imgur.com/tOs0hfs.gif",
    "https://i.imgur.com/zuzKpBB.gif",
    "https://i.imgur.com/TOBcL12.gif",
    "https://i.imgur.com/hCTWVIp.gif",
    "https://i.imgur.com/O2G7tF8.gif",
    "https://i.imgur.com/KKw4sE4.gif",
    "https://i.imgur.com/V8U0T23.gif",
    "https://i.imgur.com/QYPloHQ.gif",
    "https://i.imgur.com/vUPuyLQ.gif",
    "https://i.imgur.com/ruUabOC.gif",
    "https://i.imgur.com/w5Q6KaO.gif",
    "https://i.imgur.com/Y85uXNC.gif",
    "https://i.imgur.com/6PAqLTK.gif",
    "https://i.imgur.com/8GnuFCP.gif",
    "https://i.imgur.com/V4sZbub.gif",
    "https://i.imgur.com/mFSuQ4x.gif",
    "https://i.imgur.com/ZoMkUic.gif",
    "https://i.imgur.com/OjWBGkW.gif",
  ];

  async run(message: CommandMessage, args: string[]) {
    const reaction = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];

    message.replyEmbed(
      new Discord.MessageEmbed().setColor("RANDOM").setDescription(this.reactionMessage).setImage(reaction)
    );
  }
}
