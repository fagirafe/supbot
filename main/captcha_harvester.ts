import * as puppeteer from "puppeteer-core";

import { PupBrowser } from "./pup_browser";
import { Utils } from "./utils";

export class CaptchaHarvester extends PupBrowser {
  static tokenBank: Array<any> = [];
  private sitekey: string = "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz";
  constructor(pieBrowser: puppeteer.Browser) {
    super(pieBrowser, "https://www.supremenewyork.com/");
  }
  public async harvest() {
    await this.page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"
    );
    await this.page.setRequestInterception(true);
    const captchaReset = () => (window as any).grecaptcha.reset();
    await this.page.exposeFunction("sendCaptcha", token => {
      const captchaItem = {
        token: token,
        timestamp: Utils.createTimestamp(),
        host: this.baseUrl,
        sitekey: this.sitekey
      };

      CaptchaHarvester.tokenBank.push(captchaItem);

      (async () => {
        await this.page.evaluate(captchaReset);
      })();
    });
    const captchaTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Captcha Harvester</title>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <style>
      .flex {
        display: flex;
      }
      .justify-center {
        justify-content: center;
      }
      .items-center {
        align-items: center;
      }
      .mt-6 {
        margin-top: 1.5rem;
      }
    </style>
  </head>
  <body>
    <div class="flex justify-center items-center mt-6">
      <div id="captchaFrame" class="g-recaptcha" data-callback="sendCaptcha" data-sitekey=${this.sitekey} data-theme="dark"></div>
    </div>
  </body>
  </html>
  `;

    this.page.on("request", req => {
      if (req.url() === this.baseUrl) {
        console.log("Test");
        req.respond({
          status: 200,
          contentType: "text/html",
          body: captchaTemplate
        });
      } else {
        req.continue();
      }
    });

    await this.page.goto(this.baseUrl);
  }
}
