import Command from "../../types/Command/Command";
import { CommandMessage } from "../../extensions/Message";

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
