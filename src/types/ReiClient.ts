import { Client, ClientOptions, DiscordAPIError } from "discord.js";
import { Connection } from "mongoose";
import CommandHandler from "../core/CommandHandler";
import PrefixHandler from "../core/PrefixHandler";
import Config from "./Config";

import io from "@pm2/io";

export default class ReiClient extends Client {
  public commandHandler: CommandHandler;
  public prefixHandler: PrefixHandler;
  public db: Connection;
  public config: Config;

  public commandsRun: number = 0;
  public messagesReceived: number = 0;

  private commandsRunMetric = io.metric({
    name: "Commands run",
    value: () => {
      return this.commandsRun;
    },
  });

  private messagesReceivedMetric = io.metric({
    name: "Messages received",
    value: () => {
      return this.messagesReceived;
    },
  });

  constructor(
    commandHandler: CommandHandler,
    prefixHandler: PrefixHandler,
    db: Connection,
    config: Config,
    options?: ClientOptions
  ) {
    super(options);

    this.commandHandler = commandHandler;
    this.prefixHandler = prefixHandler;
    this.db = db;
    this.config = config;
  }
}
