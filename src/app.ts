import Discord from "discord.js";
import MongoDB from "mongodb";

import CommandMessage from "./types/CommandMessage";
import CommandLoader from "./core/CommandLoader";
import MessageHandler from "./core/MessageHandler";

const client: Discord.Client = new Discord.Client({
    disableMentions: "everyone"
});

// TODO: To config
const mongoClient: MongoDB.MongoClient = new MongoDB.MongoClient("mongodb://localhost:27017");

process.on("exit", code => {
    mongoClient.close();
    client.destroy();
    console.log(`Exiting with code ${code}`);
});

mongoClient.connect(async err => {
    if (err)
        throw "Couldn't connect to MongoDB\n" + err;

    const commands = await CommandLoader.load();
    const messageHandler = new MessageHandler(client, commands);

    client.on("ready", () => {
        console.log(`Logged in as ${client.user!.username} [${client.user!.id}]`);
    });

    client.on("message", async message => {
        try {
            messageHandler.handleMessage(message);
        } catch (err) {
            console.error(err);
        }
    });

    client.on("messageUpdate", async (oldMessage: Discord.Message | Discord.PartialMessage | CommandMessage, newMessage) => {
        const message = oldMessage as CommandMessage
        if (message.author.id == client.user!.id || message.isCommand)
            return;
    });

    client.login("")
});