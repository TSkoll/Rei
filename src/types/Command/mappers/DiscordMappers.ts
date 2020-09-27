import { Guild, GuildMember } from "discord.js";
import { CommandMessage } from "../../../extensions/Message";
import { mapToDiscordType } from "./Mapper";
import { guildMapper } from "./typemappers/Guild";
import { guildMemberMapper } from "./typemappers/GuildMember";

export type supported = typeof Guild | typeof GuildMember;
export const guild = (input: string, message: CommandMessage): Guild => mapToDiscordType(guildMapper, input, message);
export const guildMember = (input: string, message: CommandMessage): GuildMember =>
  mapToDiscordType(guildMemberMapper, input, message);
