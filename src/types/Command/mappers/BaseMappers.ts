import { map } from "./Mapper";

export type supported = "integer" | "float" | typeof Number;
export const integer = (input: string): number => validate(map(Number.parseInt, input));
export const float = (input: string): number => validate(map(Number.parseFloat, input));
export const number = (input: string): number => validate(map(Number, input));

const validate = (value: number): number => {
  if (isNaN(value)) throw "Argument was not a number!";
  return value;
};
