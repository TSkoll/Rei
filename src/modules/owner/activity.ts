import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";
import { ActivityOptions } from "discord.js";

export default class Activity extends Command {
  constructor() {
    super({
      ownerOnly: true,
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    const activityType = args[0];
    const activityMessage = args[1];

    await message.client.user!.setActivity(activityMessage, activityType as ActivityOptions);
    await message.replyBasicSuccess("Activity set!");
  }
}
