import SubCommand from "../../../types/Command/SubCommand";
import { CommandMessage } from "../../../extensions/Message";
import ScModel from "../../../models/Sc";

export default class Set extends SubCommand {
  constructor() {
    super({
      options: {
        aliases: ["link"],
      },
      help: {
        description: "Links a scoresaber account to the user's discord account.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    const scLink = args[0].replace("https://scoresaber.com/u/", "");

    const user = message.author.id;
    const payload = { sc: scLink, pp: 0 };

    await ScModel.findOneAndUpdate({ id: user }, payload, { upsert: true });
    await message.replyBasicSuccess("Scoresaber linked successfully!");
  }
}
