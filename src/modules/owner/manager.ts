import { constructSubCommand } from "../../core/subcommand/ConstructSubCommand";
import SubCommandManager from "../../core/subcommand/SubCommandManager";
import { CommandMessage } from "../../extensions/Message";
import HostCommand from "../../types/command/impl/HostCommand";
import SendTo from "./manager/sendtouser";

export default class Manager extends HostCommand {
  manager = new SubCommandManager(constructSubCommand(this, [SendTo]));

  constructor() {
    super({
      description: "",
      args: {
        def: {
          description: "",
          type: String,
        },
      },
      flags: {
        ownerOnly: true,
        hidden: true,
      },
    });
  }

  public async run(message: CommandMessage, { def }: { def: string }) {
    await message.replyBasicInfo(def);
  }
}
