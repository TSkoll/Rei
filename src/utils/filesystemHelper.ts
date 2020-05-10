import Path from "path";

import readDir from "./filesystemPromises/ReadDirPromise";
import stats from "./filesystemPromises/StatsPromise";
import readFile from "./filesystemPromises/ReadFilePromise";

export default class FilesystemHelper {
  static async getFolders(folderPath: string): Promise<string[]> {
    let retDirs: string[] = [];

    const files = await readDir(folderPath);
    for (let file of files) {
      const filePath = Path.join(folderPath, file);
      const stat = await stats(filePath);

      if (stat.isDirectory()) retDirs.push(file);
    }

    return retDirs;
  }

  static async getFiles(folderPath: string): Promise<string[]> {
    let retFiles: string[] = [];

    const files = await readDir(folderPath);
    for (let file of files) {
      const filePath = Path.join(folderPath, file);
      const stat = await stats(filePath);

      if (!stat.isDirectory()) {
        retFiles.push(file);
      }
    }

    return retFiles;
  }

  static async readFile(filePath: string): Promise<Buffer> {
    return await readFile(filePath);
  }
}
