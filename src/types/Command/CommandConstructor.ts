import CommandOptions from "./CommandOptions";
import ManualHelpText from "../Help/ManualHelpText";
import ArgumentInstructions, { ParseType } from "./Argument/ArgumentInstructions";

export default interface CommandConstructor {
  types?: { [name: string]: ParseType };
  options?: CommandOptions;
  help?: ManualHelpText;
}
