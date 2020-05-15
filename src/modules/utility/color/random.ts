import SubCommand from "../../../types/Command/SubCommand";
import { CommandMessage } from "../../../extensions/Message";

import randomcolor from "randomcolor";
import Discord, { TextChannel } from "discord.js";

import generateImage from "./utils/generateImage";
import assign from "./utils/assign";

export default class Random implements SubCommand {
  aliases = ["something"];

  public async run(message: CommandMessage, args: string[]) {
    const colors = randomcolor({ count: 6 });

    const choiceImage = await generateImage(colors, message);
    const choiceMessage = await message.channel.send('Select a color\n"exit" to exit the menu', {
      files: [choiceImage],
    });

    const messageCollector = new Discord.MessageCollector(
      message.channel as TextChannel,
      a => a.author == message.author,
      { time: 300000 }
    );

    messageCollector.on("collect", async (msg: Discord.Message) => {
      if (msg.content.toLowerCase() == "exit") return messageCollector.stop();

      const selection = Number(msg.content);
      if (!isNaN(selection)) {
        if (selection > 0 && selection <= colors.length) {
          const cr = colors[selection - 1];
          await assign(message, cr);

          return messageCollector.stop();
        } else {
          await message.replyBasicError("That's not a valid choice, is it");
        }
      }
    });

    messageCollector.on("end", async () => {
      if (choiceMessage.deletable) await choiceMessage.delete();
    });
  }
}
