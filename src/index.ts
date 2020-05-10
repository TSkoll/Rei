import mongoose, { ConnectionOptions } from "mongoose";

import ReiClient from "./types/ReiClient";
import CommandHandler from "./core/CommandHandler";
import PrefixHandler from "./core/PrefixHandler";
import MessageHandler from "./core/MessageHandler";
import Logger from "./core/Logger";

import "./extensions/Message";

import Config from "./types/Config";
const config = require("../data/config.json") as Config;

const mongooseConn = `mongodb://${
  config.database.username ? `${config.database.username}:${config.database.password}@` : ""
}${config.database.host}/${config.database.collection}`;
const mongooseConnOpt: ConnectionOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongooseConn, mongooseConnOpt, async err => {
  if (err) throw err;

  const db = mongoose.connection;

  const logger = new Logger();
  const commandHandler = new CommandHandler();
  const prefixHandler = new PrefixHandler(db, config.defaultPrefix);

  // Init ReiClient
  const client = new ReiClient(commandHandler, prefixHandler, db, logger);
  await commandHandler.init(client);

  const messageHandler = new MessageHandler(client, db);
  messageHandler.initialize();

  client.on("ready", () => {
    logger.info(`Logged in as ${client.user!.username} [${client.user!.id}]`);
  });

  client.login(config.token);
});