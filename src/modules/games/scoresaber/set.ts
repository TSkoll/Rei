import SubCommand from "../../../types/Command/SubCommand/SubCommand";
import { CommandMessage } from "../../../extensions/Message";
import ScModel from "../../../models/Sc";

import url from "url";
import fetch from "node-fetch";
import Command from "../../../types/Command/Command";

export default class Set extends SubCommand {
  constructor(parent: Command | SubCommand) {
    super(parent, {
      options: {
        aliases: ["link"],
      },
      help: {
        description: "Links a scoresaber account to the user's discord account.",
        args: {
          profile: {
            description: "A scoresaber profile URL.",
          },
        },
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    let scLink = url.parse(args[0]).pathname;
    if (!scLink) throw "This doesn't seem to be a valid scoresaber URL.";

    scLink = scLink.substring(scLink.lastIndexOf("/") + 1);

    const scUser = await fetch(`https://new.scoresaber.com/api/player/${scLink}/full`).then(resp => resp.json());
    if (!scUser.playerInfo) throw "I was unable to find you on scoresaber!";

    const user = message.author.id;
    const payload = {
      sc: scLink,
      pp: scUser.playerInfo.pp,
      rank: scUser.playerInfo.rank,
      gainsLastChecked: Date.now(),
      avgAccuracy: scUser.scoreStats.averageRankedAccuracy,
    };

    await ScModel.findOneAndUpdate({ id: user }, payload, { upsert: true });
    await message.replyBasicSuccess("Scoresaber linked successfully!");
  }
}
