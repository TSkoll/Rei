import CommandOptions from "./CommandOptions";
import HelpText from "../Help/HelpText";

export default interface CommandConstructor {
  options?: CommandOptions;
  help?: HelpText;
}
