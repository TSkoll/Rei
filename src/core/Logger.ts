import LogDocument from "../models/Log";
import { v4 as uuidv4 } from "uuid";

export default class Logger {
  public static async info(content: string, additional?: Object) {
    this.log("INFO", content, additional);
    new LogDocument({
      id: uuidv4(),
      loglevel: "INFO",
      content,
      additional,
    }).save();
  }

  public static async warning(content: string, additional?: Object) {
    this.log("WARNING", content, additional);
    new LogDocument({
      id: uuidv4(),
      loglevel: "WARNING",
      content,
      additional,
    }).save();
  }

  public static async error(content: string, additional?: Object) {
    this.log("ERROR", content, additional);
    new LogDocument({
      id: uuidv4(),
      loglevel: "ERROR",
      content,
      additional,
    }).save();
  }

  private static log(level: string, message: string, additional?: Object) {
    if (additional) console.log(`[${level}] ${this.generateTimeStamp()} ${message}`, additional);
    else console.log(`[${level}] ${this.generateTimeStamp()} ${message}`);
  }

  // TODO: Improve to be an actual timestamp
  // Fine for now
  private static generateTimeStamp() {
    const t = new Date();
    return `[${this.normalize(t.getUTCDate())}/${this.normalize(t.getUTCMonth() + 1)}/${this.normalize(
      t.getFullYear()
    )}:${this.normalize(t.getUTCHours())}:${this.normalize(t.getUTCMinutes())}:${this.normalize(t.getUTCSeconds())}]`;
  }

  private static normalize(num: number) {
    return num.toString().padStart(2, "0");
  }
}
