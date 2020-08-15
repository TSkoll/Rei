import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

export default class SetPrefix extends Command {
  constructor() {
    super({
      types: {
        prefix: "singleString",
      },
      options: {
        userPerms: ["MANAGE_GUILD"],
        singleArg: true,
      },
      help: {
        description: "Updates the used prefix for the current server.",
        args: {
          prefix: {
            description: "Prefix that'll overwrite the previous one.",
          },
        },
      },
    });
  }

  public async run(message: CommandMessage, { prefix }: { prefix: string }) {
    const client = message.reiClient;

    await client.prefixHandler.setPrefix(message, prefix);
    await message.replyBasicSuccess("Prefix updated!");
  }
}
