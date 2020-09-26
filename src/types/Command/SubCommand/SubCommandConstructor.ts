import ManualHelpText from "../../help/ManualHelpText";
import { ParseType } from "../argument/ArgumentInstructions";
import SubCommandOptions from "./SubCommandOptions";

export default interface SubCommandConstructor {
  types?: { [name: string]: ParseType };
  options?: SubCommandOptions;
  help?: ManualHelpText;
}
