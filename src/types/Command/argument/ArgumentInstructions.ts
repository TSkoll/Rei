import { supported as BaseSupportedParsers } from "../mappers/BaseMappers";
import { supported as DiscordSupportedParsers } from "../mappers/DiscordMappers";

// "Custom" string passthrough types
type StringTypes = "string" | "singleString";

export type ParseType = StringTypes | BaseSupportedParsers | DiscordSupportedParsers;
export default interface ArgumentInstructions {
  type: ParseType;
}
