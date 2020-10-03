import { GuildMember, TextChannel } from "discord.js";
import { CommandMessage } from "../../../../extensions/Message";
import MappingError from "./MappingError";

export function guildMemberMapper(input: string, message: CommandMessage): GuildMember {
  const channel = message.channel as TextChannel;
  input = input.toLowerCase();

  // Allowed formats:
  //  - <@123>
  //  - <@!123>
  if (/<@(!?)\d+>/.test(input)) {
    const member = memberFromMention(input, message);
    if (!member) throw new MappingError("Input could not be mapped to a guild member.");
    return member;
  }

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

function memberFromMention(input: string, message: CommandMessage) {
  if (input.startsWith("<@") && input.endsWith(">")) {
    input = input.slice(2, -1);

    if (input.startsWith("!")) {
      input = input.slice(1);
    }

    return (message.channel as TextChannel).members.get(input);
  }
}
