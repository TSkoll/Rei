import { constructSubCommand } from "../../core/subcommand/ConstructSubCommand";
import SubCommandManager from "../../core/subcommand/SubCommandManager";
import { CommandMessage } from "../../extensions/Message";
import HostCommand from "../../types/command/impl/HostCommand";
import Bar from "./manager/bar";
import Foo from "./manager/foo";
import Foobar from "./manager/foobar";

export default class Manager extends HostCommand {
  manager = new SubCommandManager(constructSubCommand(this, [Foo, Bar, Foobar]));

  constructor() {
    super({
      types: {
        echo: String,
      },
      options: {
        ownerOnly: true,
        singleArg: true,
        hidden: true,
      },
    });
  }

  public async run(message: CommandMessage, { echo }: { echo: string }) {
    await message.replyBasicSuccess(echo);
  }
}
