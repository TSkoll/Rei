import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

export default class Echo extends Command {
  constructor() {
    super({
      types: {
        echo: "string",
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
