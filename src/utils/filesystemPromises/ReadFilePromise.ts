import fs from "fs";

export default function ReadFilePromise(filePath: string) : Promise<Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) reject(err)
            else resolve(data);
        })
    })
}