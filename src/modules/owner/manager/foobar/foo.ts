import { CommandMessage } from "../../../../extensions/Message";
import BasicCommand from "../../../../types/command/impl/BasicCommand";

export default class Foo extends BasicCommand {
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
