import { Structures, MessageEmbed } from "discord.js";
import Command from "../types/Command/Command";
import ReiClient from "../types/ReiClient";
import Logger from "../core/Logger";

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
          `Attempting to run command "${parsed.command}" with argString "${parsed.argString}"${
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
      return await this.channel.send(new MessageEmbed().setColor("GREEN").setDescription(content));
    }

    public async replyBasicError(content: string) {
      return await this.channel.send(new MessageEmbed().setColor("RED").setDescription(content));
    }

    public async replyBasicInfo(content: string) {
      return await this.channel.send(new MessageEmbed().setColor("BLUE").setDescription(content));
    }

    public async replyEmbed(content: MessageEmbed) {
      return await this.channel.send(content);
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
