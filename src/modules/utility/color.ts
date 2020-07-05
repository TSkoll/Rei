import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import SubCommandManager from "../../types/Command/SubCommand/SubCommandManager";
import { constructSubCmd } from "../../types/Command/SubCommand/SubCommand";

import assign from "./color/utils/assign";

import Avatar from "./color/avatar";
import Remove from "./color/remove";
import Random from "./color/random";

export default class Color extends Command {
  private scm = new SubCommandManager(constructSubCmd(this, [Avatar, Remove, Random]));
  private menusOpen: string[] = [];

  constructor() {
    super({
      options: {
        disallowDM: true,
        aliases: ["colorme"],
      },
      help: {
        description: "Commands related to managing your username color on the current server.",
        args: {
          hex: {
            description: "Hex color code. Pick anything you'd like from https://htmlcolorcodes.com.",
          },
        },
      },
    });

    this.scm.default = this.default.bind(this);
  }

  public async run(message: CommandMessage, args: string[]) {
    if (this.menusOpen.includes(message.author.id))
      throw "Exit out of the current color menu before trying to assign a new one!";

    await this.scm.runSubCommand(message, args);
  }

  public openMenu(userId: string) {
    this.menusOpen.push(userId);
  }

  public closeMenu(userId: string) {
    this.menusOpen.splice(this.menusOpen.indexOf(userId), 1);
  }

  private async default(message: CommandMessage, args: string[]) {
    let color = args[0];
    const hexRegex = new RegExp("^#?(?:[0-9a-fA-F]{3}){1,2}$", "g");

    if (hexRegex.test(color)) {
      if (color[0] != "#") color = "#" + color;
      color = color.toUpperCase();

      await assign(message, color);
    } else throw "That doesn't seem to be a valid hex color!";
  }
}
