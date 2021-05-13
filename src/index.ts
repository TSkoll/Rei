import mongoose, { ConnectionOptions } from "mongoose";

import ReiClient from "./types/ReiClient";
import CommandHandler from "./core/CommandHandler";
import PrefixHandler from "./core/PrefixHandler";
import MessageHandler from "./core/MessageHandler";
import Logger from "./core/Logger";

import "./extensions/Message";

import Config from "./types/Config";
const config = require("../data/config.json") as Config;
const curpackage = require("../package.json");

const mongooseConn = `mongodb://${
  config.database.username ? `${config.database.username}:${config.database.password}@` : ""
}${config.database.host}/${config.database.collection}`;
const mongooseConnOpt: ConnectionOptions = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongooseConn, mongooseConnOpt, async err => {
  try {
    if (err) throw err;

    const db = mongoose.connection;
    const commandHandler = new CommandHandler();
    const prefixHandler = new PrefixHandler(db, config.defaultPrefix);

    // Init ReiClient
    const client = new ReiClient(commandHandler, prefixHandler, db, config, {
      messageCacheMaxSize: 2500,
      messageCacheLifetime: 86400,
      messageSweepInterval: 600,
      messageEditHistoryMaxSize: 1
    });
    await commandHandler.init(client);

    const messageHandler = new MessageHandler(client);
    messageHandler.init();

    client.on("ready", () => {
      Logger.info(`Logged in as ${client.user!.username} [${client.user!.id}]`);
      if (process.send) process.send("ready");
    });

    client.login(config.token);
  } catch (err) {
    // Leads into cleaner error output on a catastrophic error
    console.error(err.stack);
    process.exit(1);
  }
});
