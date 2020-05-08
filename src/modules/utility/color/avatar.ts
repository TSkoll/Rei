import SubCommand from "../../../types/SubCommand";
import { CommandMessage } from "../../../extensions/Message";

import Vibrant from "node-vibrant";
import Discord, { TextChannel } from "discord.js";

import generateImage from "./utils/generateImage";
import assign from "./utils/assign";

export default class Avatar implements SubCommand {
  public async run(message: CommandMessage, args: string[]) {
    const url = message.author.avatarURL({ format: "png" });

    if (!url) throw "You don't seem to have an avatar!";

    const vBuilder = new Vibrant.Builder(url);

    const swatches = await vBuilder.getSwatches();
    const keys = Object.keys(swatches);

    const choices = keys.filter(k => swatches[k]).map(k => swatches[k]!.getHex());

    const choiceImage = await generateImage(choices, message);
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
        if (selection > 0 && selection <= choices.length) {
          const cr = choices[selection - 1];
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
