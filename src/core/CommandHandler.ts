import { Client, Message, TextChannel, MessageEmbed, Permissions } from "discord.js";
import Command from "../types/Command";
import CommandMessage from "../types/CommandMessage";
import ReiClient from "../types/ReiClient";
import CommandLoader from "./CommandLoader";

export default class CommandHandler {
    private client?: ReiClient;
    private commands? : {[name: string]: Command};

    public async run(message: CommandMessage, name : string, args : string[]) {
        try {
            const cmd = this.getCommand(name.toLowerCase());
            const parsedArgs = message.args;

            const textChannel = message.channel as TextChannel;
            if (message.guild && !textChannel.permissionsFor(message.guild.me!)!.has("SEND_MESSAGES")) {
                try {
                    await cmd.run(message, parsedArgs!);
                } catch (err) {
                    await message.replyBasicError(err);
                    return;
                }
            }
        } catch (err) {
            if (err != "Command doesn't exist!") throw err;
        }
    }
    
    public async init(client: ReiClient) {
        const commands = await CommandLoader.load(client);

        this.commands = commands;
        this.client = client;
    }

    private getCommand(name : string) : Command {
        try {
            return this.commands![name];
        } catch (err) {
            throw "This command doesn't exist!";
        }
    }
}