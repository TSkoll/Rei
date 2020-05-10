import ReactionCommand from "../../types/ReactionCommand";

export default class Eskimo extends ReactionCommand {
  reactionMessage = "%user% eskimo kisses **%target%**";
  imageUrls = ["https://i.imgur.com/5YhTwcd.gif", "https://i.imgur.com/giZdJTR.gif", "https://i.imgur.com/B1u7ErN.gif"];
}
