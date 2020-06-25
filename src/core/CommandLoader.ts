import Command from "../types/Command/Command";
import fs from "../utils/filesystemHelper";
import { Client } from "discord.js";
import Logger from "./Logger";

class CommandLoader {
  static async load(client: Client): Promise<{ [name: string]: { command: Command; parent?: string } }> {
    let commandsRet: { [name: string]: { command: Command; parent?: string } } = {};

    const modules = await fs.getFolders(`${process.cwd()}/bin/modules`);

    for (let module of modules) {
      const commands = await fs.getFiles(`${process.cwd()}/bin/modules/${module}`);

      for (let command of commands) {
        if (command.indexOf(".js.map") > 0) continue;

        const cmdObj = await import(`${process.cwd()}/bin/modules/${module}/${command}`);
        const cmd = new cmdObj.default() as Command;
        const name = cmd.constructor.name.toLowerCase();

        if (!cmd.help) await Logger.warning(`Command ${name} doesn't have help documentation attached to it!`);

        commandsRet[name] = { command: cmd };

        if (cmd.aliases) {
          for (let alias of cmd.aliases) commandsRet[alias.toLowerCase()] = { command: cmd, parent: name };
        }
      }
    }

    return commandsRet;
  }
}
export default CommandLoader;
