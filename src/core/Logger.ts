import { v4 as uuidv4 } from "uuid";
import LogDocument from "../models/Log";
import consoleColors from "../utils/consoleColors";

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
    const logColor = this.logLevelToColor(level);
    const paddedLevel = this.padLevel(level);
    const timeStamp = this.generateTimeStamp();

    const white = consoleColors.fg.White;
    const reset = consoleColors.Reset;

    if (additional) {
      console.log(`${logColor}${paddedLevel} ${timeStamp}${white} ${message}${reset}`, additional);
    } else {
      console.log(`${logColor}${paddedLevel} ${timeStamp}${white} ${message}${reset}`);
    }
  }

  private static generateTimeStamp() {
    const t = new Date();

    const date = this.normalizeNumber(t.getUTCDate());
    const month = this.normalizeNumber(t.getUTCMonth() + 1);
    const year = t.getUTCFullYear();

    const hours = this.normalizeNumber(t.getUTCHours());
    const minutes = this.normalizeNumber(t.getUTCMinutes());
    const seconds = this.normalizeNumber(t.getUTCSeconds());

    return `[${date}/${month}/${year}:${hours}:${minutes}:${seconds}]`;
  }

  private static padLevel(level: string) {
    return `[${level}]`.padStart(9);
  }

  private static normalizeNumber(num: number) {
    return num.toString().padStart(2, "0");
  }

  private static logLevelToColor(level: string): string {
    switch (level) {
      case "INFO":
        return consoleColors.fg.Cyan;
      case "WARNING":
        return consoleColors.fg.Yellow;
      case "ERROR":
        return consoleColors.fg.Red;
      default:
        throw "Unknown log level.";
    }
  }
}
