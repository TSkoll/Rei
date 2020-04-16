import { Connection } from "mongoose";
import { Message } from "discord.js";

export default class PrefixHandler {
    db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }

    public checkForCommand(message: Message) {
        return (message.content.startsWith("-"))
    }
}