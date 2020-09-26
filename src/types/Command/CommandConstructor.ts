import ManualHelpText from "../help/ManualHelpText";
import { ParseType } from "./argument/ArgumentInstructions";
import CommandOptions from "./CommandOptions";

export default interface CommandConstructor {
  types?: { [name: string]: ParseType };
  options?: CommandOptions;
  help?: ManualHelpText;
}
