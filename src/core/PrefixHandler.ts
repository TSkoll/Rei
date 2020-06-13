import { Connection } from "mongoose";
import { Message } from "discord.js";
import GuildDocument from "../models/Guild";

export default class PrefixHandler {
  db: Connection;
  defaultPrefix: string;

  constructor(db: Connection, defaultPrefix: string) {
    this.db = db;
    this.defaultPrefix = defaultPrefix;
  }

  public async setPrefix(message: Message, newPrefix: string | null) {
    const guild = message.guild!.id;
    const payload = { prefix: newPrefix };

    await GuildDocument.findOneAndUpdate({ guild }, payload, { upsert: true });
  }

  public async getPrefix(message: Message) {
    if (!message.guild) return this.defaultPrefix;

    const guild = message.guild.id;
    const guildInfo = await GuildDocument.findOne({ guild });

    return (guildInfo && guildInfo.prefix) || this.defaultPrefix;
  }
}
