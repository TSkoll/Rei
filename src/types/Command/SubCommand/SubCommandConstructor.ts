import ManualHelpText from "../../Help/ManualHelpText";
import SubCommandOptions from "./SubCommandOptions";
import Command from "../Command";

export default interface SubCommandConstructor {
  options?: SubCommandOptions;
  help?: ManualHelpText;
}
