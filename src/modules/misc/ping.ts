import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";

export default class Ping extends Command {
  public async run(message: CommandMessage, args: string[]) {
    const pingMsg = await message.channel.send("Pong!");
    await pingMsg.edit(
      `Pong! Took ${pingMsg.createdTimestamp - message.createdTimestamp}ms. Websocket ping is ${
        message.client.ws.ping
      }ms.`
    );
  }
}
