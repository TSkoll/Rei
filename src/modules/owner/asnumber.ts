import { CommandMessage } from "../../extensions/Message";
import Command from "../../types/command/Command";

export default class Asnumber extends Command {
  constructor() {
    super({
      types: {
        echo: "integer",
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
