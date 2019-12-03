import * as puppeteer from "puppeteer-core";

import { BrowserWindow, app } from "electron";

import IPCMain from "./main/ipc_main";
import Main from "./main/electron_main";
import pie from "puppeteer-in-electron";

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let serve: boolean, pieBrowser: puppeteer.Browser;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

(async () => {
  pieBrowser = await pie.connect(app, puppeteer, 3002);
  IPCMain.init(pieBrowser);
})();

Main.main(app, BrowserWindow, serve);
