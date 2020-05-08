import { CommandMessage } from "../../../../extensions/Message";
import { Role } from "discord.js";

export default async function (message: CommandMessage, color: string) {
  const normalizedColor = color.toUpperCase();
  const serverColorRoles = message.member!.guild.roles.cache.filter(x => x.name[0] == "#");
  const userColorRoles = message.member!.roles.cache.filter(x => x.name[0] == "#");

  let userColor = userColorRoles.first();

  if (message.guild!.roles.cache.size > 225 && !serverColorRoles.some(role => role.name == normalizedColor))
    throw "Due to a Discord limitation of 250 roles you may not pick a color of your own.\nYou can still assign a color some other user has by copying the hex.";

  if (userColorRoles.find(role => role.name == normalizedColor)) throw "You already have this color!";

  if (serverColorRoles.some(role => role.name == normalizedColor)) {
    const r = serverColorRoles.find(role => role.name == normalizedColor);
    await assignToUser(message, r!);
  } else {
    const r = await message.guild!.roles.create({
      data: {
        name: normalizedColor,
        color: color,
        permissions: 0,
      },
      reason: "Color command through Rei",
    });

    await assignToUser(message, r!);
  }

  await message.replyBasicSuccess("Color set!");

  if (userColor) await handleOldColor(message, userColor);
}

async function assignToUser(message: CommandMessage, role: Role) {
  let tempRoles = message.member!.roles.cache.filter(role => role.name[0] != "#").array();
  tempRoles.push(role);

  await message.member!.roles.set(tempRoles);
}

async function handleOldColor(message: CommandMessage, role: Role) {
  await setTimeout(async () => {
    if (role.members.size < 1) {
      await role.delete();
    }
  }, 1000);
}
