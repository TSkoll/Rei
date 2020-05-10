import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";

export default class SetPrefix extends Command {
  public async run(message: CommandMessage, args: string[]) {
    const client = message.reiClient;
    const prefix = args[0];

    await client.prefixHandler.setPrefix(message, prefix);
    await message.replyBasicSuccess("Prefix updated!");
  }
}
