import ReactionCommand from "../../types/Command/ReactionCommand/ReactionCommand";

export default class Confuse extends ReactionCommand {
  constructor() {
    const imageUrls = [
      "https://i.imgur.com/B5ukYWx.gif",
      "https://i.imgur.com/cbehaSu.gif",
      "https://i.imgur.com/ud3ajmc.gif",
      "https://i.imgur.com/YZVRrYi.gif",
      "https://i.imgur.com/wl09J5l.gif",
      "https://i.imgur.com/ITCPruS.gif",
      "https://i.imgur.com/DwMWOhS.gif",
      "https://i.imgur.com/UJEMskZ.gif",
      "https://i.imgur.com/jFIFlO2.gif",
      "https://i.imgur.com/3s2fQ5S.gif",
      "https://i.imgur.com/XzDUOGe.gif",
      "https://i.imgur.com/jYr7Kjk.gif",
      "https://i.imgur.com/cg0Erfn.gif",
    ];

    super(imageUrls, {
      aliases: ["wat"],
      hidden: true,
    });
  }
}
