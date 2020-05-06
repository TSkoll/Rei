import LogDocument from "../models/Log";

export default class Logger {
  constructor() {}

  // TODO: Disable debug messages in prod
  // Prod and dev envs lack env variable to make this possible
  public async debug(content: string, additional?: Object) {
    console.log(`[DEBUG] ${this.generateTimeStamp()} ${content}`, additional || null);
    new LogDocument({
      loglevel: "DEBUG",
      content,
      additional,
    }).save();
  }

  public async info(content: string, additional?: Object) {
    console.log(`[INFO] ${this.generateTimeStamp()} ${content}`, additional || null);
    new LogDocument({
      loglevel: "INFO",
      content,
      additional,
    }).save();
  }

  public async warning(content: string, additional?: Object) {
    console.log(`[WARNING] ${this.generateTimeStamp()} ${content}`, additional || null);
    new LogDocument({
      loglevel: "WARNING",
      content,
      additional,
    }).save();
  }

  public async error(content: string, additional?: Object) {
    console.log(`[ERROR] ${this.generateTimeStamp()} ${content}`, additional || null);
    new LogDocument({
      loglevel: "ERROR",
      content,
      additional,
    }).save();
  }

  // TODO: Improve to be an actual timestamp
  // Fine for now
  private generateTimeStamp() {
    return Date.now();
  }
}
