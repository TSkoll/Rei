import { MessageEmbed, Structures } from "discord.js";
import Logger from "../core/Logger";
import { ParseType } from "../types/command/argument/ArgumentInstructions";
import ArgumentTypeParser from "../types/command/argument/ArgumentTypeParser";
import Command from "../types/command/Command";
import HostCommand from "../types/command/impl/HostCommand";
import ReiClient from "../types/ReiClient";

const CMessage = Structures.extend("Message", C => {
  class CommandMessage extends C {
    isCommand: boolean = false;
    prefix?: string;
    command?: Command;
    args?: object;
    reiClient: ReiClient = this.client as ReiClient;

    public async intialize(prefix: string) {
      this.isCommand = true;
      this.prefix = prefix;

      const parsed = this.parse(this.content, this.prefix);

      try {
        Logger.info(
          `Attempting to run command "${parsed.command}" with argString "${parsed.argString}"${
            this.guild ? ` on guild ${this.guild.id}` : ""
          }`
        );
        this.command = this.reiClient.commandHandler.getCommand(parsed.command);

        let stringArgs = parsed.args;
        if (this.command instanceof HostCommand) {
          const managerRet = this.command.manager?.findCommand(parsed.args);

          if (managerRet) {
            this.command = managerRet.command;
            stringArgs = managerRet.args;
          }
        }

        if (this.command.types) this.args = this.parseArgTypes(stringArgs, this.command.types);
        else this.args = undefined;

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
          this.command.pre(this);

          await this.command.run(this, this.args);

          this.reiClient.commandsRun++;
        } catch (err) {
          // No logging here due to this mainly catching user-related exceptions
          await this.replyBasicError(err);
        }
      } else throw "A commandMessage was not initialized properly!";
    }

    public async replyBasicSuccess(content: any) {
      return await this.channel.send(new MessageEmbed().setColor("GREEN").setDescription(content));
    }

    public async replyBasicError(content: any) {
      return await this.channel.send(new MessageEmbed().setColor("RED").setDescription(content));
    }

    public async replyBasicInfo(content: any) {
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

    private parseArgTypes(args: string[], instructions: { [name: string]: ParseType }): object {
      const ret: { [name: string]: any } = {};
      const instKeys = Object.keys(instructions);

      if (args.length !== instKeys.length) throw "Argument count doesn't match!";

      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const name = instKeys[i];

        const type = instructions[name];
        const value = ArgumentTypeParser.parse(arg, this, type);

        ret[name] = value;
      }

      return ret;
    }
  }

  return CommandMessage;
});
export default CMessage;

export class CommandMessage extends CMessage {}
