import Args from "./Args";

export default interface ManualHelpText {
  description: string;
  args?: { [key: string]: Args };
}
