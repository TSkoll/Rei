import ManualHelpText from "../../help/ManualHelpText";
import SubCommandOptions from "./SubCommandOptions";

export default interface SubCommandConstructor {
  options?: SubCommandOptions;
  help?: ManualHelpText;
}
