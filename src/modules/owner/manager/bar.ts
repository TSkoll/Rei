import { CommandMessage } from "../../../extensions/Message";
import BasicCommand from "../../../types/command/impl/BasicCommand";

export default class Bar extends BasicCommand {
  constructor() {
    super({
      types: {
        echo: Number,
      },
      options: {
        ownerOnly: true,
        singleArg: true,
        hidden: true,
      },
    });
  }

  public async run(message: CommandMessage, { echo }: { echo: number }) {
    await message.replyBasicSuccess(echo);
  }
}
