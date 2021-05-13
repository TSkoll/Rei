import { Connection } from "mongoose";
import ReiClient from "../types/ReiClient";
import { CommandMessage } from "../extensions/Message";
import Logger from "./Logger";

export default class MessageHandler {
  private client: ReiClient;

  constructor(client: ReiClient) {
    this.client = client;
  }

  public init() {
    this.client.on("message", async message => {
      this.client.messagesReceived++;

      if (message.partial) {
        try {
          await message.fetch();
        } catch (error) {
          Logger.error("An error occured while fetching a partial message", error);
          return;
        }
      }

      try {
        const prefix = await this.client.prefixHandler.getPrefix(message);
        const mention = `<@!${this.client.user?.id ?? 0}> `;
        let usedPrefix;

        if (message.content.startsWith(prefix)) usedPrefix = prefix;
        else if (message.content.startsWith(mention)) usedPrefix = mention;
        else return;

        const commandMessage = message as CommandMessage;
        await commandMessage.intialize(usedPrefix, prefix);
      } catch (err) {
        Logger.error(`Error from root: ${err}`);
      }
    });
  }
}
