import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import fetch from "node-fetch";
import Discord from "discord.js";

export default class Urban extends Command {
  constructor() {
    super({
      options: {
        singleArg: true,
      },
      help: {
        description: "Gets an article from the urban dictionary.",
        args: {
          query: {
            description: "A term that will be searched.",
          },
        },
      },
    });
  }

  async run(message: CommandMessage, args: string) {
    if (args.length == 0) throw "Not enough arguments!";

    const resp = await fetch(`http://api.urbandictionary.com/v0/define?term=${args}`).then(resp => resp.json());
    const data = resp.list;

    if (data.length == 0) throw "Urban Dictionary didn't find anything matching this query!";

    data.sort((a: any, b: any) => b.thumbs_up - a.thumbs_up);

    const top = data.find((x: any) => x.word.toLowerCase() == args.toLowerCase()) || data[0];

    await message.replyEmbed(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(top.word, undefined, top.permalink)
        .setDescription(top.definition)
        .addField("Example", top.example || "No example")
        .setFooter(`Author: ${top.author} | ${top.thumbs_up}👍 ${top.thumbs_down}👎`)
    );
  }
}
