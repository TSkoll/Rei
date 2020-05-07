import SubCommand from "../../../types/SubCommand";
import { CommandMessage } from "../../../extensions/Message";

export default class Sub1 implements SubCommand {
  aliases = ["s"];

  public async run(message: CommandMessage, args: string[]) {
    await message.replyBasicSuccess("Reply from Sub1, args: " + args.join(", "));
  }
}
