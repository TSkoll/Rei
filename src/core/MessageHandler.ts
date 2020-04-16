import Command from "../types/Command";
import { Client, Message } from "discord.js";

import { Connection } from "mongoose";
import ReiClient from "../types/ReiClient";

export default class MessageHandler {
    private client : ReiClient;
    private db : Connection;

    constructor(client: ReiClient, db: Connection) {
        this.client = client;
        this.db = db;
    }

    public initialize() {
        this.client.on("message", async message => {
            try {
                if (!this.client.prefixHandler.checkForCommand(message))
                    return;

                const commandMessage = message;
                //await commandMessage.intialize();

                this.client.emit("command", commandMessage);
            } catch (err) {
                console.error(`Error from root: ${err}`);
            }
        });
    }
}