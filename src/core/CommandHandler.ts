import Command from "../types/Command";
import ReiClient from "../types/ReiClient";
import CommandLoader from "./CommandLoader";

export default class CommandHandler {
  private client?: ReiClient;
  private commands?: { [name: string]: Command };

  public async init(client: ReiClient) {
    const commands = await CommandLoader.load(client);

    this.commands = commands;
    this.client = client;
  }

  public getCommand(name: string): Command {
    const command = this.commands![name];

    if (command) return command;
    else throw "This command doesn't exist!";
  }
}
