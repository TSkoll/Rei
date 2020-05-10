import SubCommand from "../../../types/SubCommand";
import { CommandMessage } from "../../../extensions/Message";
import getUser from "./utils/getUser";
import fetch from "node-fetch";
import Discord from "discord.js";
import mapDifficulty from "./utils/difficultyMap";

interface mapDifficulty {
  songAuthorName: string;
  name: string;
  diff: string;
  levelAuthorName: string;
  score: number;
  maxScoreEx: number;
  pp: any;
}

export default class User implements SubCommand {
  aliases = ["stats"];

  public async run(message: CommandMessage, args: string[]) {
    let scid = await getUser(message.author.id, args[0]);

    const urls = [
      `https://new.scoresaber.com/api/player/${scid}/full`,
      `https://new.scoresaber.com/api/player/${scid}/scores/top`,
    ].map(url => fetch(url).then(resp => resp.json()));
    const userData = await Promise.all(urls);

    if (!userData[0].playerInfo) throw "This player could not be found!";

    message.replyEmbed(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          userData[0].playerInfo.name,
          "https://new.scoresaber.com" + userData[0].playerInfo.avatar,
          "https://scoresaber.com/u/" + userData[0].playerInfo.playerid
        )
        .addField("Performance Points", userData[0].playerInfo.pp + "pp", true)
        .addField("Global Rank", "#" + userData[0].playerInfo.rank, true)
        .addField(`Country Rank [${userData[0].playerInfo.country}]`, "#" + userData[0].playerInfo.countryRank, true)
        .addField(
          "Top ranks",
          userData[1].scores
            .map(
              (s: mapDifficulty, i: number) =>
                `**${i + 1}.** ${s.songAuthorName} - ${s.name} **[${mapDifficulty(s.diff)}]** by **${
                  s.levelAuthorName
                }**\n${((s.score / s.maxScoreEx) * 100).toFixed(2)}% - ${s.pp}pp`
            )
            .slice(0, 3)
            .join("\n\n")
        )
    );
  }
}
