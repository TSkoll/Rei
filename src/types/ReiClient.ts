import { Client, ClientOptions, DiscordAPIError } from "discord.js";
import { Connection } from "mongoose";
import CommandHandler from "../core/CommandHandler";
import PrefixHandler from "../core/PrefixHandler";

export default class ReiClient extends Client {
  public commandHandler: CommandHandler;
  public prefixHandler: PrefixHandler;
  public db: Connection;

  constructor(commandHandler: CommandHandler, prefixHandler: PrefixHandler, db: Connection, options?: ClientOptions) {
    super(options);

    this.commandHandler = commandHandler;
    this.prefixHandler = prefixHandler;
    this.db = db;
  }
}
