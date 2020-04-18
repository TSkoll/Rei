import { Connection } from "mongoose";
import { Message } from "discord.js";

import GuildDocument from "../models/Guild";

export default class PrefixHandler {
    db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }
    
    public getPrefix(message: Message) {
        return "-";
    }
}