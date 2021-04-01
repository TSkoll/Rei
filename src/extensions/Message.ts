import { Structures, MessageEmbed } from "discord.js";
import { Uwuifier } from "uwuifier";
import Command from "../types/Command/Command";
import ReiClient from "../types/ReiClient";
import Logger from "../core/Logger";

const uwuifier = new Uwuifier({
  /*spaces: {
    faces: 0.1,
    actions: 0.0005,
    stutters: 0.1,
  },*/
  words: 0.25,
  exclamations: 1,
});

const CMessage = Structures.extend("Message", C => {
  class CommandMessage extends C {
    isCommand: boolean = false;
    prefix?: string;
    serverPrefix?: string;
    command?: Command;
    args?: string[];
    argsString?: string;
    reiClient: ReiClient = this.client as ReiClient;

    public async intialize(prefix: string, serverPrefix: string) {
      this.isCommand = true;
      this.prefix = prefix;
      this.serverPrefix = serverPrefix;

      const parsed = this.parse(this.content, this.prefix);

      try {
        Logger.info(
          `Processing command "${parsed.command}" with argString "${parsed.argString}"${
            this.guild ? ` on guild ${this.guild.id}` : ""
          }`
        );
        this.command = this.reiClient.commandHandler.getCommand(parsed.command);
        this.args = parsed.args;
        this.argsString = parsed.argString;

        await this.run();
      } catch (ex) {
        if (ex == "This command doesn't exist!") return;

        const exPayload = {
          messageContent: this.content,
          prefix,
          parsed,
        };
        Logger.error(ex, exPayload);

        await this.replyBasicError(ex);
      }
    }

    public async run() {
      if (this.command && this.args) {
        try {
          this.command.checkPermissions(this);

          if (!this.command.singleArg) await this.command.run(this, this.args);
          else await this.command.run(this, this.argsString!);

          this.reiClient.commandsRun++;
        } catch (err) {
          // No logging here due to this mainly catching user-related exceptions
          await this.replyBasicError(err);
        }
      } else throw "A commandMessage was not initialized properly!";
    }

    public async replyBasicSuccess(content: string) {
      return await this.channel.send(
        new MessageEmbed().setColor("GREEN").setDescription(uwuifier.uwuifySentence(content))
      );
    }

    public async replyBasicError(content: string) {
      return await this.channel.send(
        new MessageEmbed().setColor("RED").setDescription(uwuifier.uwuifySentence(content))
      );
    }

    public async replyBasicInfo(content: string) {
      return await this.channel.send(
        new MessageEmbed().setColor("BLUE").setDescription(uwuifier.uwuifySentence(content))
      );
    }

    public async replyEmbed(content: MessageEmbed) {
      const uwud = new MessageEmbed();
      if (content.description) uwud.setDescription(uwuifier.uwuifySentence(content.description));
      if (content.footer?.text)
        uwud.setFooter(
          uwuifier.uwuifySentence(content.footer.text),
          content.footer.iconURL || content.footer.proxyIconURL
        );
      if (content.fields)
        uwud.addFields(
          content.fields.map(field => {
            return {
              name: uwuifier.uwuifySentence(field.name),
              inline: field.inline,
              value: uwuifier.uwuifySentence(field.value),
            };
          })
        );
      if (content.color) uwud.setColor(content.color);
      if (content.author)
        uwud.setAuthor(content.author.name, content.author.iconURL, content.author.url || content.author.proxyIconURL);
      if (content.image) uwud.setImage(content.image.url);
      if (content.thumbnail) uwud.setThumbnail(content.thumbnail.url);
      if (content.url) uwud.setURL(content.url);
      if (content.timestamp) uwud.setTimestamp(content.timestamp);

      return await this.channel.send(uwud);
    }

    private parse(content: string, prefix: string) {
      const withoutPrefix = content.substring(prefix.length);
      const commandName = withoutPrefix.split(" ", 1)[0];
      const argString = withoutPrefix.substring(commandName.length + 1);

      const argsMatches = argString.match(new RegExp('"[^"]+"|[\\S]+', "g"));
      const args = argsMatches ? argsMatches.map(el => el.replace(new RegExp('"', "g"), "")) : [];

      return {
        command: commandName,
        args,
        argString,
      };
    }
  }

  return CommandMessage;
});
export default CMessage;

export class CommandMessage extends CMessage {}
