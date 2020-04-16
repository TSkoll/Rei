import {Message, MessageEmbed} from "discord.js";
import Command from "./Command";

export default class CommandMessage extends Message {
    isCommand: boolean = false
    prefix?: string
    command?: Command
    args?: string[]

    public async intialize() {
        this.isCommand = true
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