import Command from "../types/Command";
import fs from "../utils/FilesystemHelper";
import { Client } from "discord.js";

class CommandLoader {
  static async load(client: Client): Promise<{ [name: string]: Command }> {
    let commandsRet: { [name: string]: Command } = {};

    const modules = await fs.getFolders("./bin/modules/");

    for (let module of modules) {
      const commands = await fs.getFiles(`./bin/modules/${module}`);

      for (let command of commands) {
        if (command.indexOf(".js.map") > 0) continue;

        const cmdObj = await import(`../modules/${module}/${command}`);
        const cmd = new cmdObj.default(client) as Command;
        const name = cmd.constructor.name.toLowerCase();

        commandsRet[name] = cmd;

        if (cmd.aliases) {
          for (let alias of cmd.aliases) commandsRet[alias.toLowerCase()] = cmd;
        }
      }
    }

    return commandsRet;
  }
}
export default CommandLoader;
