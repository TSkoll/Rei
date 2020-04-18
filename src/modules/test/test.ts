import Command from "../../types/Command";
import Discord from "discord.js";
import { CommandMessage } from "../../extensions/Message";

export default class Test extends Command {
    public async run(message: CommandMessage, args: string[]): Promise<void> {
        message.replyBasicSuccess(`Hello World! These were the arguments: ${args.join(", ")}`);
    }
}