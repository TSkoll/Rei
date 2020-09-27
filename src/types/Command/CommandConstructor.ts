import ExecutionFlags from "./flags/ExecutionFlags";

export default interface CommandConstructor {
  types?: Object;
  options?: Object;
  flags?: ExecutionFlags;
}
