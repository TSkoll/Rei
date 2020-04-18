import { Structures, MessageEmbed } from "discord.js";
import Command from "../types/Command";
import ReiClient from "../types/ReiClient";

const CMessage = Structures.extend("Message", C => {
    class CommandMessage extends C {
        isCommand: boolean = false
        prefix?: string
        command?: Command
        args?: string[]

        public async intialize(prefix: string) {
            this.isCommand = true
            this.prefix = prefix;

            // TODO this requires a bit of tidying
            const split = this.content.split(" ");
            const comName = split.splice(0, 1)[0].substring(this.prefix.length, this.content.length);
            const client = this.client as ReiClient;

            this.command = client.commandHandler.getCommand(comName);
            this.args = split;

            await this.run();
        }

        public async run() {
            if (this.command && this.args)
                await this.command.run(this, this.args);
            else
                throw "A commandMessage was not initialized properly!";
        }

        public async replyBasicSuccess(content: string) {
            return await this.channel.send(new MessageEmbed().setColor("GREEN").setDescription(content));
        }

        public async replyBasicError(content: string) {
            return await this.channel.send(new MessageEmbed().setColor("RED").setDescription(content));
        }
    }
    
    return CommandMessage;
});
export default CMessage;

export class CommandMessage extends CMessage { };