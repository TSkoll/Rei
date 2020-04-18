import fs from "fs";

export default function StatsPromise(filePath: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stat) => {
      if (err) reject(err);
      else resolve(stat);
    });
  });
}
