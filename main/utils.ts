import * as request from "request";

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

  export function getRecaptchaResponseToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      request("http://localhost:3001/fetch", (err, res, body) => {
        if (err) {
          reject(err);
        } else if (res && res.statusCode == 200) {
          let data = JSON.parse(body);
          if (data.length) {
            let token = data[data.length - 1]["token"];
            resolve(token);
          } else {
            reject("No recaptcha response token!");
          }
        }
      });
    });
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
