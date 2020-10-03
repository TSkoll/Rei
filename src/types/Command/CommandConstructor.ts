import CommandArgs from "./CommandArgs";
import ExecutionFlags from "./flags/ExecutionFlags";

export default interface CommandConstructor {
  description?: string;
  args?: { [name: string]: CommandArgs };
  flags?: ExecutionFlags;
}
