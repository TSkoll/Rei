import HelpText from "../Help/HelpText";
import SubCommandOptions from "./SubCommandOptions";

export default interface SubCommandConstructor {
  options?: SubCommandOptions;
  help?: HelpText;
}
