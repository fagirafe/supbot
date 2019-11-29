import * as puppeteer from "puppeteer-core";

import { BrowserWindow } from "electron";
import pie from "puppeteer-in-electron";

export class PupBrowser {
  protected pieBrowser: puppeteer.Browser;
  protected page: puppeteer.Page;
  protected window: BrowserWindow;
  protected baseUrl: string = "https://www.supremenewyork.com/";

  constructor(pieBrowser: puppeteer.Browser) {
    this.pieBrowser = pieBrowser;
  }

  public async init(): Promise<void> {
    // const options = {
    //   headless: false,
    //   devtools: false,
    //   ignoreHTTPSErrors: true,
    //   defaultViewport: null,
    //   args: [
    //     "--no-sandbox",
    //     "--ignore-certificate-errors",
    //     "--enable-features=NetworkService",
    //     "--allow-running-insecure-content",
    //     "--disable-web-security",
    //     "--user-agent='Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'"
    //   ]
    // };

    this.window = new BrowserWindow();
    this.window.setMenuBarVisibility(false);

    this.page = await pie.getPage(this.pieBrowser, this.window);
    let client = await this.page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await this.page.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
    );
    await this.page.setViewport({
      width: 0,
      height: 0
    });
    // await this.window.loadURL(this.baseUrl);
    await this.page.goto(this.baseUrl, { waitUntil: "networkidle2" });
  }

  public async close(): Promise<void> {
    await this.window.close();
  }
}
