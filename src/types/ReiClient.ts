import { Client, ClientOptions, DiscordAPIError } from "discord.js";
import { Connection } from "mongoose";
import CommandHandler from "../core/CommandHandler";
import PrefixHandler from "../core/PrefixHandler";
import Logger from "../core/Logger";

export default class ReiClient extends Client {
  public commandHandler: CommandHandler;
  public prefixHandler: PrefixHandler;
  public db: Connection;
  public logger: Logger;

  public commandsRun: number = 0;
  public messagesReceived: number = 0;

  constructor(
    commandHandler: CommandHandler,
    prefixHandler: PrefixHandler,
    db: Connection,
    logger: Logger,
    options?: ClientOptions
  ) {
    super(options);

    this.commandHandler = commandHandler;
    this.prefixHandler = prefixHandler;
    this.db = db;
    this.logger = logger;
  }
}
