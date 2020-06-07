import CommandOptions from "./CommandOptions";
import ManualHelpText from "../Help/ManualHelpText";

export default interface CommandConstructor {
  options?: CommandOptions;
  help?: ManualHelpText;
}
