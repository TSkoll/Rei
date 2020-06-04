import { CommandMessage } from "../../../extensions/Message";
import SubCommand from "../../../types/Command/SubCommand";
import getUser from "./utils/getUser";
import fetch from "node-fetch";
import ScModel, { ISc } from "../../../models/Sc";
import Discord from "discord.js";
import DeltaTime, { DeltaTimeResult, TimeScale } from "../../../types/DeltaTime";

export default class Gains implements SubCommand {
  public async run(message: CommandMessage, args: string[]) {
    let scid = await getUser(message.author.id, undefined);

    const user = await fetch(`https://new.scoresaber.com/api/player/${scid}/full`).then(resp => resp.json());

    if (!user.playerInfo) throw "This player could not be found!";

    const previous = await ScModel.findOne({ id: message.author.id });
    const ppGain = user.playerInfo.pp - previous!.pp;
    const ranks = this.presentRank(user.playerInfo.rank, ppGain, previous!.rank);
    const timeStamp = Date.now();

    await previous!.updateOne({
      sc: previous!.sc,
      pp: user.playerInfo.pp,
      rank: user.playerInfo.rank,
      gainsLastChecked: timeStamp,
    });

    message.replyEmbed(
      new Discord.MessageEmbed()
        .setAuthor(
          user.playerInfo.name,
          "https://new.scoresaber.com" + user.playerInfo.avatar,
          "https://scoresaber.com/u/" + user.playerInfo.playerid
        )
        .setColor(ranks.color)
        .setDescription(
          `You **${ppGain >= 0 ? "gained" : "lost"} ${parseFloat(ppGain.toFixed(3))}pp** ${this.durationSinceString(
            timeStamp,
            previous!.gainsLastChecked
          )}${ranks.inMessage}`
        )
        .setFooter(`${previous!.pp}pp -> ${user.playerInfo.pp}pp${ranks.inFooter}`)
    );
  }

  private durationSinceString(now: number, last?: number) {
    if (!last) return "";
    else {
      const delta = now - last;

      const time = new DeltaTime(delta).toMaxRounded(TimeScale.Day);
      return `in the last ${this.determineDurationOutput(time)}`;
    }
  }

  private determineDurationOutput(delta: DeltaTimeResult) {
    if (delta.scale != 0)
      return delta.value == 1
        ? DeltaTime.timescaleToLabel(delta.scale, false)
        : `${delta.value} ${DeltaTime.timescaleToLabel(delta.scale)}`;
    else return "instant";
  }

  private presentRank(userRank: number, ppGain: number, scRank?: number) {
    if (scRank) {
      const rank = userRank - scRank;
      const pretext =
        (rank < 0 && "and **gained ") ||
        (rank > 0 && ppGain <= 0 && "and **lost ") ||
        (rank > 0 && ppGain > 0 && "but **lost ") ||
        "and **moved ";

      return {
        inMessage: ` (${pretext}${Math.abs(rank)} rank${Math.abs(rank) == 1 ? "**" : "s**"})`,
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
