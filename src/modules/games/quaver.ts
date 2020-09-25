import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import SubCommandManager from "../../types/Command/SubCommand/SubCommandManager";
import { constructSubCmd } from "../../types/Command/SubCommand/SubCommand";

import Set from "./quaver/set";

export default class Quaver extends Command {
  private scm = new SubCommandManager(constructSubCmd(this, [Set]));

  constructor() {
    super({
      options: {
        aliases: ["q"],
      },
      help: {
        description: "Commands related to https://quavergame.com/.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    await this.scm.runSubCommand(message, args);
  }
}
