import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";

import fetch from "node-fetch";
import Discord from "discord.js";

export default class Urban extends Command {
  async run(message: CommandMessage, args: string[]) {
    if (args.length == 0) throw "Not enough arguments!";

    const combinedArgs = args.join(" ");

    const resp = await fetch(`http://api.urbandictionary.com/v0/define?term=${combinedArgs}`).then(resp => resp.json());
    const data = resp.list;

    if (data.length == 0) throw "Urban Dictionary didn't find anything matching this query!";

    data.sort((a: any, b: any) => b.thumbs_up - a.thumbs_up);

    const top = data.find((x: any) => x.word.toLowerCase() == combinedArgs.toLowerCase()) || data[0];

    await message.replyEmbed(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(top.word, undefined, top.permalink)
        .addField("Definition", top.definition)
        .addField("Example", top.example || "No example")
        .setFooter(`Author: ${top.author} | ${top.thumbs_up}👍 ${top.thumbs_down}👎`)
    );
  }
}
