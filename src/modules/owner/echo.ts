import Command from "../../types/Command";
import { CommandMessage } from "../../extensions/Message";

export default class Echo extends Command {
  constructor() {
    super({
      ownerOnly: true,
    });
  }

  public async run(message: CommandMessage, args: string[]) {
    await message.replyBasicSuccess(args.join(" "));
  }
}
