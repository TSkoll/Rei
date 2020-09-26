import { CommandMessage } from "../../../extensions/Message";
import { float, integer } from "../Mappers/BaseMappers";
import { guild, guildMember } from "../Mappers/DiscordMappers";
import { ParseType } from "./ArgumentInstructions";

export default class ArgumentTypeParser {
  static parse(input: string, message: CommandMessage, type: ParseType) {
    switch (type) {
      case "string":
      case "singleString":
        return input;
      case "float":
        return float(input);
      case "integer":
        return integer(input);
      case "guildMember":
        return guildMember(input, message);
      case "guild":
        return guild(input, message);
      default:
        throw Error("Unknown type.");
    }
  }
}
