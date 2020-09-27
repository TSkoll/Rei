import { map } from "./Mapper";

export type supported = "integer" | "float";
export const integer = (input: string): number => validate(map(Number.parseInt, input));
export const float = (input: string): number => validate(map(Number.parseFloat, input));

const validate = (value: number): number => {
  if (isNaN(value)) throw "Argument was not a number!";
  return value;
};
