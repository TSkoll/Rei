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
  public readonly years: number;
  public readonly months: number;
  public readonly days: number;
  public readonly hours: number;
  public readonly minutes: number;
  public readonly seconds: number;
  public readonly milliseconds: number;

  public readonly totalYears: number;
  public readonly totalMonths: number;
  public readonly totalDays: number;
  public readonly totalHours: number;
  public readonly totalMinutes: number;
  public readonly totalSeconds: number;
  public readonly totalMilliseconds: number;

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
    this.totalYears = ms / this.yearInMs;
    this.totalMonths = ms / this.monthInMs;
    this.totalDays = ms / this.dayInMs;
    this.totalHours = ms / this.hourInMs;
    this.totalMinutes = ms / this.minuteInMs;
    this.totalSeconds = ms / this.secondInMs;
    this.totalMilliseconds = ms;

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
    switch (scale) {
      case TimeScale.Year:
        return this.totalMilliseconds / this.yearInMs;
      case TimeScale.Month:
        return this.totalMilliseconds / this.monthInMs;
      case TimeScale.Day:
        return this.totalMilliseconds / this.dayInMs;
      case TimeScale.Hour:
        return this.totalMilliseconds / this.hourInMs;
      case TimeScale.Minute:
        return this.totalMilliseconds / this.minuteInMs;
      case TimeScale.Second:
        return this.totalMilliseconds / this.secondInMs;
      case TimeScale.Millisecond:
        return this.totalMilliseconds;
      case TimeScale.Instant:
        return 0;
      default:
        throw "Unknown type";
    }
  }

  public toMax(scale: TimeScale, breakpoint?: number): DeltaTimeResult {
    const highestScale = this.findHighestTimeScale(breakpoint);

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

  public toMaxRounded(scale: TimeScale, breakpoint?: number): DeltaTimeResult {
    return this.roundDeltaTimeResult(this.toMax(scale, breakpoint));
  }

  public toHighestRounded(): DeltaTimeResult {
    return this.roundDeltaTimeResult(this.toHighest());
  }

  private findHighestTimeScale(breakpoint: number = 1): TimeScale {
    if (this.totalYears > breakpoint) return TimeScale.Year;
    else if (this.totalMonths > breakpoint) return TimeScale.Month;
    else if (this.totalDays > breakpoint) return TimeScale.Day;
    else if (this.totalHours > breakpoint) return TimeScale.Hour;
    else if (this.totalMinutes > breakpoint) return TimeScale.Minute;
    else if (this.totalSeconds > breakpoint) return TimeScale.Second;
    else if (this.totalMilliseconds > 1) return TimeScale.Millisecond;
    else return TimeScale.Unknown;
  }

  private roundDeltaTimeResult(result: DeltaTimeResult) {
    return { value: Math.floor(result.value), scale: result.scale };
  }
}
