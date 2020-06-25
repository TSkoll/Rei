import ReactionCommand from "../../types/Command/ReactionCommand/ReactionCommand";

export default class Smile extends ReactionCommand {
  constructor() {
    const imageUrls = [
      "https://i.imgur.com/mZSuX9D.gif",
      "https://i.imgur.com/gpBPE9a.gif",
      "https://i.imgur.com/MZeBna4.gif",
      "https://i.imgur.com/LpekVEo.gif",
      "https://i.imgur.com/Uue24lZ.gif",
      "https://i.imgur.com/ggjapLh.gif",
      "https://i.imgur.com/81TODKv.gif",
      "https://i.imgur.com/NlyjAAr.gif",
      "https://i.imgur.com/MkEFMRT.gif",
      "https://i.imgur.com/alT2rW1.gif",
      "https://i.imgur.com/ouPafHi.gif",
      "https://i.imgur.com/6F7xsbN.gif",
      "https://i.imgur.com/h0mtyLb.gif",
    ];

    super(imageUrls, {
      hidden: true,
    });
  }
}
