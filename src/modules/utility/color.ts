import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";
import SubCommandManager from "../../types/SubCommandManager";
import { constructSubCmd } from "../../types/SubCommand";

import Avatar from "./color/avatar";

export default class Color extends Command {
  private scm = new SubCommandManager(constructSubCmd([Avatar]));

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
    message.reply("owo");
  }
}
