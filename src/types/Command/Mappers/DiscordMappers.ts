import { CommandMessage } from "../../../extensions/Message";
import { Guild, GuildMember } from "discord.js";
import { mapToDiscordType } from "./Mapper";
import { guildMapper } from "./Helpers/Guild";
import { guildMemberMapper } from "./Helpers/GuildMember";

export type supported = "guild" | "guildMember";
export const guild = (input: string, message: CommandMessage): Guild => mapToDiscordType(guildMapper, input, message);
export const guildMember = (input: string, message: CommandMessage): GuildMember =>
  mapToDiscordType(guildMemberMapper, input, message);
