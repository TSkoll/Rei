import SubCommand from "../../../types/Command/SubCommand/SubCommand";
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

export default class User extends SubCommand {
  constructor() {
    super({
      options: {
        aliases: ["stats"],
      },
      help: {
        description:
          "Gets a scoresaber profile statistics. If a profile id or url is provided will get statistics from that user. If the user has linked their profile and no id or url was provided linked user statistics will be presented.",
        args: {
          profile: {
            description: "A scoresaber profile URL or ID.",
          },
        },
      },
    });
  }

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
              (s: any, i: number) =>
                `**${i + 1}.** ${s.songAuthorName} - ${s.songName} **[${mapDifficulty(s.difficultyRaw)}]** by **${
                  s.levelAuthorName
                }**\n${((s.score / s.maxScore) * 100).toFixed(2)}% - ${s.pp}pp`
            )
            .slice(0, 3)
            .join("\n\n")
        )
    );
  }
}
