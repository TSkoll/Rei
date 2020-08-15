import { map } from "./Mapper";

export const integer = (input: string): number => map(Number.parseInt, input);
export const float = (input: string): number => map(Number.parseFloat, input);
