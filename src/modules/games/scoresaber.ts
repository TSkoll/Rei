import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

import SubCommandManager from "../../types/Command/SubCommand/SubCommandManager";
import { constructSubCmd } from "../../types/Command/SubCommand/SubCommand";

import Set from "./scoresaber/set";
import User from "./scoresaber/user";
import Gains from "./scoresaber/gains";

export default class ScoreSaber extends Command {
  private scm = new SubCommandManager(constructSubCmd(this, [Set, User, Gains]));

  constructor() {
    super({
      options: {
        aliases: ["sc"],
      },
      help: {
        description: "Commands related to https://scoresaber.com/.",
      },
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    await this.scm.runSubCommand(message, args);
  }
}
