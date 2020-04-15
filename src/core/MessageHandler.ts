import Command from "../types/Command";
import { Client, Message } from "discord.js";

import CommandMessage from "../types/CommandMessage";
import CommandHandler from "./CommandHandler";

export default class MessageHandler {
    private commands : {[name: string]: Command};
    private client : Client;
    private commandHandler : CommandHandler;

    constructor(client : Client, commands : {[name: string]: Command}) {
        this.commands = commands;
        this.client = client;
        this.commandHandler = new CommandHandler(client, commands);
    }

    async handleMessage(message: Message) {
        if (message.author.id == this.client.user!.id) 
            return;

        const prefix = "-";

        if (message.content.startsWith(prefix)) {
            const cmd = message.content.indexOf(" ") > 0
                ? message.content.substring(prefix.length, message.content.indexOf(" "))
                : message.content.substring(prefix.length);

            const commandMessage = message as CommandMessage
            commandMessage.prefix = prefix;

            try {
                
            } catch (err) {
                
            }
        }
    }
}