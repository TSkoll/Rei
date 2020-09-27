import { Guild, GuildMember } from "discord.js";
import { CommandMessage } from "../../../extensions/Message";
import { float, integer, number } from "../mappers/BaseMappers";
import { guild, guildMember } from "../mappers/DiscordMappers";
import { ParseType } from "./ArgumentInstructions";

export default class ArgumentTypeParser {
  static parse(input: string, message: CommandMessage, type: ParseType) {
    switch (type) {
      case String:
        return input;
      case Number:
        return number(input);
      case "float":
        return float(input);
      case "integer":
        return integer(input);
      case GuildMember:
        return guildMember(input, message);
      case Guild:
        return guild(input, message);
      default:
        throw Error("Unknown type.");
    }
  }
}
