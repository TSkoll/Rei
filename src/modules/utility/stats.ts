import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import Discord, { MessageEmbed } from "discord.js";

import DeltaTime from "../../types/DeltaTime";

export default class Stats extends Command {
  private startTime = Date.now();

  public async run(message: CommandMessage, args: string[]) {
    const serverCount = message.client.guilds.cache.size;
    const userCount = message.client.users.cache.size;

    await message.replyEmbed(
      new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(message.client.user!.username, message.client.user!.avatarURL()!)
        .addField("Uptime", this.epochToTimeDifferenceString(Date.now() - this.startTime), true)
        .addField("Servers | Users", `${serverCount} | ${userCount}`, true)
        .addField("Memory usage", Math.round(process.memoryUsage().heapUsed / 1049000) + " MiB", true)
        .addField("Commands ran", message.reiClient.commandsRun, true)
        .addField("Messages received", message.reiClient.messagesReceived, true)
    );
  }

  private epochToTimeDifferenceString(epoch: number) {
    const diff = new DeltaTime(epoch);

    const years = diff.years > 0 ? diff.years + "y" : "";
    const months = diff.months > 0 ? diff.months + "m" : "";
    const days = diff.days > 0 ? diff.days + "d" : "";
    const hours = diff.hours > 0 ? diff.hours + "h" : "";
    const mins = diff.minutes > 0 ? diff.minutes + "min" : "";
    const seconds = diff.seconds > 0 ? diff.seconds + "s" : "";

    return `${years} ${months} ${days} ${hours} ${mins} ${seconds}`;
  }
}
