declare module "brainfuck-node" {
  export class Memory {
    constructor(base: number);
  }

  export class Result {
    constructor(output: string, memory: Memory, steps: number, time: number);

    public output: string;
    public memory: Memory;
    public steps: Number;
    public time: Number;
  }

  export default class Brainfuck {
    constructor(options?: { maxSteps?: number });

    public execute(code: string, input: string): Result;
  }
}
