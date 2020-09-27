import { ParseType } from "./argument/ArgumentInstructions";
import ExecutionFlags from "./flags/ExecutionFlags";

export default interface CommandConstructor {
  types?: { [name: string]: ParseType };
  options?: Object;
  flags?: ExecutionFlags;
}
