export enum TimeScale {
  Year = 7,
  Month = 6,
  Day = 5,
  Hour = 4,
  Minute = 3,
  Second = 2,
  Millisecond = 1,
  Instant = 0,
  Unknown = -1,
}

export interface DeltaTimeResult {
  value: number;
  scale: TimeScale;
}

export default class DeltaTime {
  public years: number;
  public months: number;
  public days: number;
  public hours: number;
  public minutes: number;
  public seconds: number;
  public milliseconds: number;

  private readonly totalms: number;
  private readonly yearInMs = 31556926000;
  private readonly monthInMs = 2628000000;
  private readonly dayInMs = 86400000;
  private readonly hourInMs = 3600000;
  private readonly minuteInMs = 60000;
  private readonly secondInMs = 1000;

  private static timescaleLabels: { [key: number]: string } = {
    7: "year",
    6: "month",
    5: "day",
    4: "hour",
    3: "minute",
    2: "second",
    1: "millisecond",
    0: "instant",
  };

  constructor(ms: number) {
    this.totalms = ms;

    this.years = Math.floor(ms / this.yearInMs);
    const totalMonths = ms % this.yearInMs;

    this.months = Math.floor(totalMonths / this.monthInMs);
    const totalDays = totalMonths % this.monthInMs;

    this.days = Math.floor(totalDays / this.dayInMs);
    const totalHours = totalDays % this.dayInMs;

    this.hours = Math.floor(totalHours / this.hourInMs);
    const totalMinutes = totalHours % this.hourInMs;

    this.minutes = Math.floor(totalMinutes / this.minuteInMs);
    const totalSeconds = totalMinutes % this.minuteInMs;

    this.seconds = Math.floor(totalSeconds / this.secondInMs);
    this.milliseconds = totalSeconds % this.secondInMs;
  }

  public static timescaleToLabel(scale: TimeScale, plural: boolean = true) {
    return this.timescaleLabels[scale] + (plural ? "s" : "");
  }

  public asObject(): { [key: string]: number } {
    return {
      years: this.years,
      months: this.months,
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds,
    };
  }

  public to(scale: TimeScale): number {
    // This will give out the entire
    switch (scale) {
      case TimeScale.Year:
        return this.totalms / this.yearInMs;
      case TimeScale.Month:
        return this.totalms / this.monthInMs;
      case TimeScale.Day:
        return this.totalms / this.dayInMs;
      case TimeScale.Hour:
        return this.totalms / this.hourInMs;
      case TimeScale.Minute:
        return this.totalms / this.minuteInMs;
      case TimeScale.Second:
        return this.totalms;
      case TimeScale.Instant:
        return 0;
      default:
        throw "Unknown type";
    }
  }

  public toMax(scale: TimeScale): DeltaTimeResult {
    const highestScale = this.findHighestTimeScale();

    if (highestScale <= scale) return { value: this.to(highestScale), scale: highestScale };
    else return { value: this.to(scale), scale };
  }

  public toHighest(): DeltaTimeResult {
    const highestScale = this.findHighestTimeScale();
    return { value: this.to(highestScale), scale: highestScale };
  }

  public toRounded(scale: TimeScale): number {
    return Math.floor(this.to(scale));
  }

  public toMaxRounded(scale: TimeScale): DeltaTimeResult {
    return this.roundDeltaTimeResult(this.toMax(scale));
  }

  public toHighestRounded(): DeltaTimeResult {
    return this.roundDeltaTimeResult(this.toHighest());
  }

  private findHighestTimeScale(): TimeScale {
    if (this.years > 1) return TimeScale.Year;
    else if (this.months > 1) return TimeScale.Month;
    else if (this.days > 1) return TimeScale.Day;
    else if (this.hours > 1) return TimeScale.Hour;
    else if (this.minutes > 1) return TimeScale.Minute;
    else if (this.seconds > 1) return TimeScale.Second;
    else if (this.milliseconds > 1) return TimeScale.Millisecond;
    else return TimeScale.Unknown;
  }

  private roundDeltaTimeResult(result: DeltaTimeResult) {
    return { value: Math.floor(result.value), scale: result.scale };
  }
}
