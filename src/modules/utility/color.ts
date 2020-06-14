import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import SubCommandManager from "../../types/Command/SubCommand/SubCommandManager";
import { constructSubCmd } from "../../types/Command/SubCommand/SubCommand";

import assign from "./color/utils/assign";

import Avatar from "./color/avatar";
import Remove from "./color/remove";
import Random from "./color/random";

export default class Color extends Command {
  private scm = new SubCommandManager(this, constructSubCmd([Avatar, Remove, Random]));

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
    await this.scm.runSubCommand(message, args);
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
