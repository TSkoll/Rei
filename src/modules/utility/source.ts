import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";

import Config from "../../types/Config";
const config = require("../../../data/config.json") as Config;

export default class Source extends Command {
  constructor() {
    super({
      aliases: ["sauce"],
    });
  }

  // TODO: Message lookup doesn't work as it did, investigate
  public async run(message: CommandMessage, args: string[]) {
    const messages = await message.channel.messages.fetch({ limit: 10 });
    const arr = messages.array();

    for (let msg of arr) {
      if (message.attachments.size != 0) {
        const img = message.attachments.first();

        if (img && img.height) {
          const sauce = await this.getSauce(img.url);
          const sorted = this.sortSauce(sauce);

          if (sorted.length == 0) throw "No matches were found for the image!";

          await message.replyEmbed(this.embedify(sorted));
          return;
        } else if (message.embeds.length > 0) {
          const e = message.embeds[0];
          const imageURL = (e.thumbnail && e.thumbnail.url) || e.url || (e.image && e.image.url);

          if (imageURL) {
            const rawSauce = await this.getSauce(imageURL);
            const sortedSauce = this.sortSauce(rawSauce);

            if (sortedSauce.length == 0) throw "No matches were found for the image!";

            await message.replyEmbed(this.embedify(sortedSauce));
            return;
          }
        }
      }
    }

    throw "I couldn't find images in the last 10 messages!";
  }

  // Any type due to saucenao api not having specifications
  private embedify(sortedSauce: any) {
    let desc = `**#1: ${this.textify(sortedSauce[0])}**\n\n`;

    for (let j = 1; j < sortedSauce.length; j++) {
      desc += `#${j + 1} ${this.textify(sortedSauce[j])}\n\n`;
    }

    let retMsg = new MessageEmbed()
      .setColor("BLUE")
      .setThumbnail(sortedSauce[0].thumbnailURL)
      .setTitle(`Found ${sortedSauce.length} matches!`)
      .setDescription(desc)
      .setFooter("Powered by saucenao");

    return retMsg;
  }

  private textify(data: any) {
    let ret = `(${data.sim}%) `;

    // Checks
    if (data.creator) ret += data.creator;

    if (data.title) ret += `${data.creator ? " - " + data.title : data.title}`;

    if (data.sourceURL) ret += `${data.creator || data.title ? " - " + data.sourceURL : data.sourceURL}`;

    return ret;
  }

  private async getSauce(url: string) {
    const params = new URLSearchParams();
    params.append("output_type", "2");
    params.append("api_key", config.integrations.saucenaoKey!);
    params.append("url", url);

    const resp = await fetch("https://saucenao.com/search.php", {
      method: "POST",
      body: params,
    }).then(resp => resp.json());
    return resp;
  }

  // Any type due to saucenao api not having specifications
  private sortSauce(sauce: any) {
    const results = sauce.results;
    let finds = [];

    for (let r of results) {
      const d = r.data;
      const h = r.header;

      const sourceURL = d.ext_urls ? d.ext_urls[0] : null;
      const thumbnailURL = h.thumbnail;

      // Title prioritisation
      const title = d.title || d.jp_name || d.source;
      const creator = (d.creator instanceof Array && d.creator[0]) || d.creator || d.member_name || d.author_name;

      const sim = Number(h.similarity);

      finds.push({
        sourceURL,
        thumbnailURL,
        title,
        creator,
        sim,
      });
    }

    finds = finds.filter(r => r.sim > 60);
    finds.sort((a, b) => b.sim - a.sim);

    return finds;
  }
}
