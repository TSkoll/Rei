import Discord from "discord.js";

export default class CommandMessage extends Discord.Message {
    isCommand: boolean = false
    prefix?: string
}