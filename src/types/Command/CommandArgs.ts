import { ParseType } from "./argument/ArgumentInstructions";

export default interface CommandArgs {
  description?: string;
  type: ParseType;
}
