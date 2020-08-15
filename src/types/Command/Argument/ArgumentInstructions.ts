import { supported as BaseSupportedParsers } from "../Mappers/BaseMappers";
import { supported as DiscordSupportedParsers } from "../Mappers/DiscordMappers";
import { GuildMember, Guild } from "discord.js";

// "Custom" string passthrough types
type StringTypes = "string" | "singleString";

export type ParseType = StringTypes | BaseSupportedParsers | DiscordSupportedParsers;
export default interface ArgumentInstructions {
  type: ParseType;
}
