import { GuildMember, TextChannel } from "discord.js";
import { CommandMessage } from "../../../../extensions/Message";
import MappingError from "./MappingError";

export function guildMemberMapper(input: string, message: CommandMessage): GuildMember {
  // TODO: this should handle pings too
  const channel = message.channel as TextChannel;
  input = input.toLowerCase();

  const matchingMembers = channel.members
    .filter(
      member =>
        member.user.username.toLowerCase().includes(input) ||
        member.nickname?.toLowerCase().includes(input) ||
        member.user.tag.toLowerCase() === input ||
        member.id === input
    )
    .sort((a, b) => b.roles.highest.position - a.roles.highest.position);

  const foundMember = matchingMembers.first();

  if (foundMember) return foundMember;
  else throw new MappingError("Input could not be mapped to a guild member.");
}
