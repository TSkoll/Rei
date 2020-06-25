import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import { TextChannel } from "discord.js";

export default class Send extends Command {
  constructor() {
    super({
      options: {
        ownerOnly: true,
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    const guild = args[0];
    const channel = args[1];
    const sent = args[2];

    const textChannel = message.client.guilds.cache.get(guild)!.channels.cache.get(channel)! as TextChannel;
    textChannel.send(sent);
  }
}
