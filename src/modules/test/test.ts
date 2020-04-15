import Command from "../../types/Command";
import Discord from "discord.js";

export class Test extends Command {
    public async run(client: Discord.Client, message: Discord.Message, args: string[]): Promise<void> {
        await super.sendBasicSuccess(message, "Hello World!");
    }
}