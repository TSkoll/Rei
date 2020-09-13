import { CommandMessage } from "../../../extensions/Message";
import SubCommand from "../../../types/Command/SubCommand/SubCommand";
import getUser from "./utils/getUser";
import fetch from "node-fetch";
import ScModel, { ISc } from "../../../models/Sc";
import Discord from "discord.js";
import DeltaTime, { DeltaTimeResult, TimeScale } from "../../../types/DeltaTime";
import Command from "../../../types/Command/Command";
import { ScoresaberUserFull } from "../../../types/Requests/Scoresaber/ScoresaberUserFull";

export default class Gains extends SubCommand {
  constructor(parent: Command | SubCommand) {
    super(parent, {
      help: {
        description:
          "Checks and compares the change of the user's rank and pp. Requires that the user has linked their scoresaber account.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    let scid = await getUser(message.author.id, undefined);

    const user = (await fetch(`https://new.scoresaber.com/api/player/${scid}/full`).then(resp =>
      resp.json()
    )) as ScoresaberUserFull;

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
      avgAccuracy: user.scoreStats.averageRankedAccuracy,
    });

    message.replyEmbed(
      new Discord.MessageEmbed()
        .setAuthor(
          user.playerInfo.playerName,
          "https://new.scoresaber.com" + user.playerInfo.avatar,
          "https://scoresaber.com/u/" + user.playerInfo.playerId
        )
        .setColor(ranks.color)
        .setDescription(
          `You **${ppGain >= 0 ? "gained" : "lost"} ${this.prettyPrintpp(ppGain)}pp** ${this.durationSinceString(
            timeStamp,
            previous!.gainsLastChecked
          )}${ranks.inMessage}`
        )
        .setFooter(`${previous!.pp}pp -> ${user.playerInfo.pp}pp${ranks.inFooter}`)
    );
  }

  private prettyPrintpp(pp: number) {
    // Round to two digits, if necessary
    return Math.round((pp + Number.EPSILON) * 100) / 100;
  }

  private durationSinceString(now: number, last?: number) {
    if (!last) return "";
    else {
      const delta = now - last;

      const time = new DeltaTime(delta).toMaxRounded(TimeScale.Day, 2);
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
