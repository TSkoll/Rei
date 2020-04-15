import Discord from "discord.js";

export default abstract class Command {
    protected ownerOnly   : boolean                               = false;
    protected argsCount   : number                                = 0;
    protected ignoreMin   : number                                = 0;
    protected botPerms?   : Discord.PermissionResolvable[]        = undefined;
    protected userPerms?  : Discord.PermissionResolvable[]        = undefined;
    protected disallowDM  : boolean                               = false;
    protected nsfw        : boolean                               = false;
    protected aliases?    : string[] | string                     = undefined;
    protected ratelimit   : number                                = 0;

    public async sendBasicSuccess(message : Discord.Message, content : string) : Promise<Discord.Message> {
        return await message.channel.send(new Discord.MessageEmbed().setColor("GREEN").setDescription(content));
    }

    public async sendBasicError(message : Discord.Message, content : string) : Promise<Discord.Message> {
        return await message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(content));
    }
    public abstract async run(client : Discord.Client, message : Discord.Message, args : string[]) : Promise<void>;
}