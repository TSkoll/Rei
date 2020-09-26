import { supported as BaseSupportedParsers } from "../Mappers/BaseMappers";
import { supported as DiscordSupportedParsers } from "../Mappers/DiscordMappers";

// "Custom" string passthrough types
type StringTypes = "string" | "singleString";

export type ParseType = StringTypes | BaseSupportedParsers | DiscordSupportedParsers;
export default interface ArgumentInstructions {
  type: ParseType;
}
