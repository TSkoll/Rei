import ReactionCommand from "../../types/Command/ReactionCommand/ReactionCommand";

export default class Eskimo extends ReactionCommand {
  constructor() {
    const imageUrls = [
      "https://i.imgur.com/5YhTwcd.gif",
      "https://i.imgur.com/giZdJTR.gif",
      "https://i.imgur.com/B1u7ErN.gif",
    ];

    super(imageUrls, {
      hidden: true,
    });
  }
}
