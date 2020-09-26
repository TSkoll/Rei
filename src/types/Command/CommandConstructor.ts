import ManualHelpText from "../Help/ManualHelpText";
import { ParseType } from "./Argument/ArgumentInstructions";
import CommandOptions from "./CommandOptions";

export default interface CommandConstructor {
  types?: { [name: string]: ParseType };
  options?: CommandOptions;
  help?: ManualHelpText;
}
