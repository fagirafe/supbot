import * as request from "request";

import { CustomError } from "ts-custom-error";

export namespace Utils {
  export class RuntimeTimer {
    private readonly NS_PER_SEC: number = 1e9;
    private readonly MS_PER_NS: number = 1e-6;
    private startTime: [number, number];

    constructor() {}

    public start(): void {
      this.startTime = process.hrtime();
      return;
    }
    public getRuntimeMs() {
      const diff = process.hrtime(this.startTime);
      return (diff[0] * this.NS_PER_SEC + diff[1]) * this.MS_PER_NS;
    }
  }

  export class CopError extends CustomError {
    constructor(message?: string) {
      super(message);
    }
  }

  export function createTimestamp(): string {
    let current = new Date().getTime();
    let hours: number = Math.floor(
      (current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes: number = Math.floor(
      (current % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds: number = Math.floor((current % (1000 * 60)) / 1000);
    let hoursString: string = hours < 10 ? "0" + hours : hours.toString();
    let minutesString: string =
      minutes < 10 ? "0" + minutes : minutes.toString();
    let secondsString: string =
      seconds < 10 ? "0" + seconds : seconds.toString();
    let timestamp = hoursString + ":" + minutesString + ":" + secondsString;
    return timestamp;
  }
}
