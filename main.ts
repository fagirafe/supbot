import * as path from "path";
import * as puppeteer from "puppeteer-core";
import * as updater from "electron-simple-updater";
import * as url from "url";

import { BrowserWindow, app, ipcMain, screen, shell } from "electron";

import AutoUpdater from "./main/auto_updater";
import { Bot } from "./main/bot";
import Main from "./main/electron_main";
import { ProcessLogger } from "./main/process_logger";
import pie from "puppeteer-in-electron";

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let serve: boolean, pieBrowser: puppeteer.Browser;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

(async () => {
  pieBrowser = await pie.connect(app, puppeteer, 3002);
})();

AutoUpdater.init();

Main.main(app, BrowserWindow, serve);

ipcMain.on("start", async (event, arg) => {
  console.log("Starting...");
  try {
    await Bot.start(
      arg["items"]["entities"][Object.keys(arg["items"]["entities"])[0]] !=
        undefined
        ? arg["items"]["entities"][Object.keys(arg["items"]["entities"])[0]]
        : {},
      arg["profile"],
      arg["settings"]
    );
  } catch (err) {
    return ProcessLogger.log(ProcessLogger.LogType.Error, err);
  }
  return ProcessLogger.log(
    ProcessLogger.LogType.Finished,
    "Finished the cop process!"
  );
});

ipcMain.handle("prepare", async (event, arg) => {
  console.log("Preparing...");
  try {
    await Bot.init(pieBrowser);
    return Promise.resolve();
  } catch (err) {
    console.log(err);
  }
});

ipcMain.handle("cancel", async (event, arg) => {
  console.log("Canceling...");
  await Bot.closeWindows();
  return Promise.resolve();
});

ipcMain.handle("stop", async (event, arg) => {
  console.log("Stopping...");
  return Promise.resolve();
});

ipcMain.on("quit", (event, arg) => {
  app.quit();
});

ipcMain.on("open-link", (event, arg) => {
  shell.openExternal(arg);
});
