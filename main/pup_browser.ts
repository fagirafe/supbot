import * as puppeteer from "puppeteer";

export class PupBrowser {
  protected browser: puppeteer.Browser;
  protected page: puppeteer.Page;
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.browser = null;
    this.page = null;
    this.baseUrl = baseUrl;
  }

  public async init(): Promise<void> {
    const options = {
      headless: false,
      devtools: false,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
      args: [
        "--no-sandbox",
        "--ignore-certificate-errors",
        "--enable-features=NetworkService",
        "--allow-running-insecure-content",
        "--disable-web-security",
        "--user-agent='Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'"
      ]
    };
    this.browser = await puppeteer.launch(options);
    this.page = await this.browser.newPage();
    await this.page.setViewport({
      width: 0,
      height: 0
    });
    await this.page.goto(this.baseUrl, { waitUntil: "networkidle2" });
  }

  public async close(): Promise<void> {
    await this.browser.close();
  }
}
