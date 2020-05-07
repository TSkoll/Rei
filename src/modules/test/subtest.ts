import Discord from "discord.js";

import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";
import SubCommandManager from "../../types/SubCommandManager";
import Sub1 from "./subtest/sub1";
import SubCommand, { constructSubCmd } from "../../types/SubCommand";

export default class SubTest extends Command {
  subCommandManager: SubCommandManager;

  constructor() {
    super({
      aliases: ["sb"],
    });

    this.subCommandManager = new SubCommandManager(constructSubCmd([Sub1]));
  }

  public async run(message: CommandMessage, args: string[]): Promise<void> {
    await this.subCommandManager.runSubCommand(args[0], args.slice(1), message);
  }
}
