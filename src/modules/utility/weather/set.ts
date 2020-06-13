import SubCommand from "../../../types/Command/SubCommand/SubCommand";
import { CommandMessage } from "../../../extensions/Message";

import UserModel from "../../../models/User";

export default class Set extends SubCommand {
  constructor() {
    super({
      options: {
        aliases: ["default"],
      },
      help: {
        description: "Sets the specified city as user's default location.",
        args: {
          city: {
            description: "The city that will be the user's default location.",
          },
        },
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    // Handles both "place,area" and "place area" inputs
    const area = args.join(",");

    const user = message.author.id;
    const payload = { defaultWeather: area };

    await UserModel.findOneAndUpdate({ id: user }, payload, { upsert: true });
    await message.replyBasicSuccess("Location updated!");
  }
}
