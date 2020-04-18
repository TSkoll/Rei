import Command from "../../types/Command";
import Discord from "discord.js";
import { CommandMessage } from "../../extensions/Message";
import ReiClient from "../../types/ReiClient";

export default class SetPrefix extends Command {
  public async run(message: CommandMessage, args: string[]): Promise<void> {
    const client = message.client as ReiClient;
    const prefix = args[0];

    await client.prefixHandler.setPrefix(message, prefix);
    await message.replyBasicSuccess("Prefix updated!");
  }
}
