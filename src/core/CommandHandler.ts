import { Client, Message, TextChannel, MessageEmbed, Permissions } from "discord.js";
import Command from "../types/Command";

export default class CommandHandler {
    private client : Client;
    private commands : {[name: string]: Command};

    constructor(client : Client, commands : {[name: string]: Command}) {
        this.client = client;
        this.commands = commands;
    }

    public async run(message : Message, name : string, args : string[]) {
        try {
            const cmd = this.getCommand(name.toLowerCase());
            const parsedArgs = ["owo", "uwu", "foo", "bar"];

            const textChannel = message.channel as TextChannel;
            if (message.guild && !textChannel.permissionsFor(message.guild.me!)!.has("SEND_MESSAGES")) {
                try {
                    await cmd.run(this.client, message, parsedArgs);
                } catch (err) {
                    await cmd.sendBasicError(message, err);
                    return;
                }
            }
        } catch (err) {
            if (err != "Command doesn't exist!") throw err;
        }
    }

    private getCommand(name : string) : Command {
        try {
            return this.commands[name];
        } catch (err) {
            throw "This command doesn't exist!";
        }
    }
}