import Command from "../types/Command";
import fs from "../utils/FilesystemHelper";
import Path from "path";

class CommandLoader {
    static async load() : Promise<{[name: string]: Command }> {
        let commandsRet: {[name: string]: Command} = { }

        const modules = await fs.getFolders("./bin/modules/");

        for (let module of modules) {
            const commands = await fs.getFiles(`./bin/modules/${module}`);

            for (let command of commands) {
                const cmdObj = await import(`../modules/${module}/${command}`);
                const cmd = new cmdObj[Object.keys(cmdObj)[0]]();
                const name = "test";

                commandsRet[name] = cmd;
            }
        }

        return commandsRet;
    }
}
export default CommandLoader;