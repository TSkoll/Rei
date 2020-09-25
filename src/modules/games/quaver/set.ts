import SubCommand from "../../../types/Command/SubCommand/SubCommand";
import Command from "../../../types/Command/Command";
import { CommandMessage } from "../../../extensions/Message";
import url from "url";
import fetch from "./utils/fetch";
import QuaverModel from "../../../models/Quaver";

export default class Set extends SubCommand {
  constructor(parent: Command | SubCommand) {
    super(parent, {});
  }

  public async run(message: CommandMessage, args: string[]) {
    const preferredMode = args[0];
    if (preferredMode != "4k" && preferredMode != "7k") throw 'Preferred mode must be "4k" or "7k"';

    let userId = url.parse(args[1]).pathname;
    if (!userId) throw "This doesn't seem to be a valid quaver URL.";
    userId = userId.substring(userId.lastIndexOf("/") + 1);

    const qUser = await fetch.fullUser(userId);
    const dUserId = message.author.id;
    const payload = {
      q: userId,
      pref: preferredMode,
      keys4: {
        perf: qUser.user.keys4.stats.overall_performance_rating,
        acc: qUser.user.keys4.stats.overall_accuracy,
        grank: qUser.user.keys4.globalRank,
        crank: qUser.user.keys4.countryRank,
      },
      keys7: {
        perf: qUser.user.keys7.stats.overall_performance_rating,
        acc: qUser.user.keys7.stats.overall_accuracy,
        grank: qUser.user.keys7.globalRank,
        crank: qUser.user.keys7.countryRank,
      },
      gainsLastChecked: Date.now(),
    };

    await QuaverModel.findOneAndUpdate({ id: dUserId }, payload, { upsert: true });
    await message.replyBasicSuccess("Quaver linked successfully!");
  }
}
