import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";

export default class Echo extends Command {
  constructor() {
    super({
      ownerOnly: true,
      singleArg: true,
    });
  }

  public async run(message: CommandMessage, args: string) {
    await message.replyBasicSuccess(args);
  }
}
