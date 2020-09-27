import { supported as BaseSupportedParsers } from "../mappers/BaseMappers";
import { supported as DiscordSupportedParsers } from "../mappers/DiscordMappers";

// "Custom" string passthrough types
export type ParseType = typeof String | BaseSupportedParsers | DiscordSupportedParsers;
export default interface ArgumentInstructions {
  type: ParseType;
}
