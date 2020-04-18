import Command from "../types/Command";

import { Connection } from "mongoose";
import ReiClient from "../types/ReiClient";
import { CommandMessage } from "../extensions/Message";

export default class MessageHandler {
    private client: ReiClient;
    private db: Connection;

    constructor(client: ReiClient, db: Connection) {
        this.client = client;
        this.db = db;
    }

    public initialize() {
        this.client.on("message", async message => {
            try {
                const prefix = await this.client.prefixHandler.getPrefix(message);

                if (message.content.startsWith(prefix)) {
                    const commandMessage = message as CommandMessage;
                    await commandMessage.intialize(prefix);
                }
            } catch (err) {
                console.error(`Error from root: ${err}`);
            }
        });
    }
}