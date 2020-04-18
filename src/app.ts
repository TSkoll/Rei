import mongoose from "mongoose";

import ReiClient from "./types/ReiClient";
import CommandHandler from "./core/CommandHandler";
import PrefixHandler from "./core/PrefixHandler";
import MessageHandler from "./core/MessageHandler";

import "./extensions/Message";

mongoose.connect("mongodb://localhost:27017", async err => {
    if (err)
        throw err;

    const db = mongoose.connection;

    const commandHandler = new CommandHandler();
    const prefixHandler = new PrefixHandler(db);

    // Init ReiClient
    const client = new ReiClient(commandHandler, prefixHandler, db);
    await commandHandler.init(client);

    const messageHandler = new MessageHandler(client, db);
    messageHandler.initialize();

    client.on("ready", () => {
        console.log(`Logged in as ${client.user!.username} [${client.user!.id}]`);
    });

    client.login("NDE5Nzk1NDY0OTg1MTE2Njcy.DoPvRA.vkulV0MCOqjTKIHKyNXWA-2LBXM");
});