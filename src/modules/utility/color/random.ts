import SubCommand from "../../../types/Command/SubCommand/SubCommand";
import { CommandMessage } from "../../../extensions/Message";
import Command from "../../../types/Command/Command";
import Color from "../color";

import randomcolor from "randomcolor";
import Discord, { TextChannel } from "discord.js";

import generateImage from "./utils/generateImage";
import assign from "./utils/assign";

export default class Random extends SubCommand {
  private color: Color;

  constructor(parent: Command | SubCommand) {
    super(parent, {
      options: {
        aliases: ["something"],
      },
      help: {
        description: "Brings up a menu suggesting random colors.",
      },
    });

    this.color = parent as Color;
  }

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

    this.color.openMenu(message.author.id);
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
      this.color.closeMenu(message.author.id);
      if (choiceMessage.deletable) await choiceMessage.delete();
    });
  }
}
