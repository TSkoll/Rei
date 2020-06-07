import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import { MessageEmbed } from "discord.js";

import bf from "brainfuck-node";

export default class Brainfuck extends Command {
  private bf = new bf({ maxSteps: 10000000 });

  constructor() {
    super({
      options: {
        aliases: ["bf"],
      },
      help: {
        name: "brainfuck",
        description: "Interpolates brainfuck code syntax. Maximum of 10,000,000 steps.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    const resp = this.bf.execute(args[0], args[1] || "");
    await message.replyEmbed(
      new MessageEmbed()
        .setColor("GREEN")
        .setDescription(resp.output)
        .setFooter(`Steps: ${resp.steps} || Time: ${resp.time}ms`)
    );
  }
}
