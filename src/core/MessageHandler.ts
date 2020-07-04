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

      try {
        const prefix = await this.client.prefixHandler.getPrefix(message);

        if (message.content.startsWith(prefix)) {
          const commandMessage = message as CommandMessage;
          await commandMessage.intialize(prefix);
        }
      } catch (err) {
        Logger.error(`Error from root: ${err}`);
      }
    });
  }
}
