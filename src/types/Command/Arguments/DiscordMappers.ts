import { CommandMessage } from "../../../extensions/Message";
import { Guild, GuildMember } from "discord.js";
import { mapToDiscordType } from "./Mapper";
import { guildMapper } from "./Mappers/Guild";
import { guildMemberMapper } from "./Mappers/GuildMember";

export const guild = (input: string, message: CommandMessage): Guild => mapToDiscordType(guildMapper, input, message);
export const guildMember = (input: string, message: CommandMessage): GuildMember =>
  mapToDiscordType(guildMemberMapper, input, message);
