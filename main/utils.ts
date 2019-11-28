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
}
