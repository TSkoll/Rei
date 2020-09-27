import { CommandMessage } from "../../extensions/Message";
import HostCommand from "../../types/command/impl/HostCommand";

export default class Manager extends HostCommand {
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
