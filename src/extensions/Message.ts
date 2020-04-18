import { Structures, MessageEmbed } from "discord.js";
import Command from "../types/Command";

const CMessage = Structures.extend("Message", C => {
    class CommandMessage extends C {
        isCommand: boolean = false
        prefix?: string
        command?: Command
        args?: string[]

        public async intialize(prefix: string) {
            this.isCommand = true
            this.prefix = prefix;
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

export class CommandMessage extends CMessage {};