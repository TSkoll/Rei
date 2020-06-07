import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

export default class SetPrefix extends Command {
  constructor() {
    super({
      options: {
        userPerms: ["MANAGE_GUILD"],
        singleArg: true,
      },
      help: {
        description: "Updates the used prefix for the current server.",
      },
    });
  }

  public async run(message: CommandMessage, args: string) {
    const client = message.reiClient;
    const prefix = args;

    await client.prefixHandler.setPrefix(message, prefix);
    await message.replyBasicSuccess("Prefix updated!");
  }
}
