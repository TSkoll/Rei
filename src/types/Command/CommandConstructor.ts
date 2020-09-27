import ExecutionFlags from "./flags/ExecutionFlags";

export default interface CommandConstructor {
  flags?: ExecutionFlags;
}
