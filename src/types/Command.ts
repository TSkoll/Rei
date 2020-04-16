import { Client } from "discord.js";
import CommandMessage from "./CommandMessage";
import CommandOptions from "./CommandOptions";
import { MongoClient } from "mongodb";

export default abstract class Command extends CommandOptions {
    constructor(options?: CommandOptions) {
        super(options);
    }

    public abstract async run(message: CommandMessage, args : string[]) : Promise<void>;

    public async afterInit?() : Promise<void>;
}