import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";
import SubCommandManager from "../../types/Command/SubCommandManager";
import { constructSubCmd } from "../../types/Command/SubCommand";

import assign from "./color/utils/assign";

import Avatar from "./color/avatar";
import Remove from "./color/remove";
import Random from "./color/random";

export default class Color extends Command {
  private scm = new SubCommandManager(constructSubCmd([Avatar, Remove, Random]));

  constructor() {
    super({
      disallowDM: true,
      aliases: ["colorme"],
    });

    this.scm.default = this.default;
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
