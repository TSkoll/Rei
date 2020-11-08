import { supported as BaseSupportedParsers } from "../mappers/BaseMappers";
import { supported as DiscordSupportedParsers } from "../mappers/DiscordMappers";

export type RestTypes = "RestString";
export type SupportedStringTypes = typeof String;

// "Custom" string passthrough types
export type ParseType = SupportedStringTypes | BaseSupportedParsers | DiscordSupportedParsers | RestTypes;
export default interface ArgumentInstructions {
  type: ParseType;
}
