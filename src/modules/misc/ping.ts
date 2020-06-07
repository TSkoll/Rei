import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

export default class Ping extends Command {
  constructor() {
    super({
      help: {
        name: "ping",
        description:
          "Sends a message on the channel and calculates the latency between the bot and the discord server.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    const pingMsg = await message.channel.send("Pong!");
    await pingMsg.edit(
      `Pong! Took ${pingMsg.createdTimestamp - message.createdTimestamp}ms. Websocket ping is ${
        message.client.ws.ping
      }ms.`
    );
  }
}
