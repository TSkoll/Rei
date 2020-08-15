import { CommandMessage } from "../../../../extensions/Message";
import { Guild } from "discord.js";
import MappingError from "./MappingError";

export function guildMapper(input: string, message: CommandMessage): Guild {
  const guild = message.client.guilds.cache.get(input);

  if (!guild) throw new MappingError("Input could not be mapped to a Discord Guild.");

  return guild;
}
