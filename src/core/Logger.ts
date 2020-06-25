import LogDocument from "../models/Log";
import { v4 as uuidv4 } from "uuid";
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
    if (additional)
      console.log(
        `${this.logLevelToColor(level)}${this.padLevel(level)} ${this.generateTimeStamp()}${
          consoleColors.fg.White
        } ${message}${consoleColors.Reset}`,
        additional
      );
    else
      console.log(
        `${this.logLevelToColor(level)}${this.padLevel(level)} ${this.generateTimeStamp()}${
          consoleColors.fg.White
        } ${message}${consoleColors.Reset}`
      );
  }

  // TODO: Improve to be an actual timestamp
  // Fine for now
  private static generateTimeStamp() {
    const t = new Date();
    return `[${this.normalizeNum(t.getUTCDate())}/${this.normalizeNum(t.getUTCMonth() + 1)}/${this.normalizeNum(
      t.getFullYear()
    )}:${this.normalizeNum(t.getUTCHours())}:${this.normalizeNum(t.getUTCMinutes())}:${this.normalizeNum(
      t.getUTCSeconds()
    )}]`;
  }

  private static padLevel(level: string) {
    return `[${level}]`.padStart(9);
  }

  private static normalizeNum(num: number) {
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
