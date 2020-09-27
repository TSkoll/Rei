import { CommandMessage } from "../../../extensions/Message";

export const map = <A, B>(mapper: (a: A) => B, input: A): B => {
  return mapper(input);
};

export const mapToDiscordType = <A, B>(
  mapper: (a: A, message: CommandMessage) => B,
  input: A,
  message: CommandMessage
): B => {
  return mapper(input, message);
};
