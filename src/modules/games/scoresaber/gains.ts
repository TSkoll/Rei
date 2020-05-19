import { CommandMessage } from "../../../extensions/Message";
import SubCommand from "../../../types/Command/SubCommand";
import getUser from "./utils/getUser";
import fetch from "node-fetch";
import ScModel, { ISc } from "../../../models/Sc";
import Discord from "discord.js";

export default class Gains implements SubCommand {
  public async run(message: CommandMessage, args: string[]) {
    let scid = await getUser(message.author.id, undefined);

    const user = await fetch(`https://new.scoresaber.com/api/player/${scid}/full`).then(resp => resp.json());

    if (!user.playerInfo) throw "This player could not be found!";

    const previous = await ScModel.findOne({ id: message.author.id });
    const ranks = this.presentRank(user.playerInfo.rank, previous!.rank);

    await previous!.updateOne({ sc: previous!.sc, pp: user.playerInfo.pp, rank: user.playerInfo.rank });

    message.replyEmbed(
      new Discord.MessageEmbed()
        .setAuthor(
          user.playerInfo.name,
          "https://new.scoresaber.com" + user.playerInfo.avatar,
          "https://scoresaber.com/u/" + user.playerInfo.playerid
        )
        .setColor(ranks.color)
        .setDescription(
          `You gained ${parseFloat((user.playerInfo.pp - previous!.pp).toFixed(3))}pp since the last time${
            ranks.inMessage
          }`
        )
        .setFooter(`${previous!.pp}pp -> ${user.playerInfo.pp}pp${ranks.inFooter}`)
    );
  }

  private presentRank(userRank: number, scRank?: number) {
    if (scRank) {
      const rank = userRank - scRank;
      const pretext = (rank < 0 && "and gained ") || (rank > 0 && "and lost ") || "and moved ";

      return {
        inMessage: ` (${pretext}${Math.abs(rank)} rank${Math.abs(rank) == 1 ? "" : "s"})`,
        inFooter: ` (#${scRank} -> #${userRank})`,
        color: (rank < 0 && "GREEN") || (rank > 0 && "RED") || "BLUE",
      };
    } else {
      return {
        inMessage: "",
        inFooter: "",
        color: "BLUE",
      };
    }
  }
}
