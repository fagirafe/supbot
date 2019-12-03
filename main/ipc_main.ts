import { app, ipcMain, shell } from "electron";

import { Bot } from "./bot";
import { Browser } from "puppeteer-core";
import { ProcessLogger } from "./process_logger";

export default class IPCMain {
  public static init(pieBrowser: Browser) {
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
      console.log("Cancelling...");
      try {
        await Bot.closeWindows();
      } catch (err) {
        // catch err
      } finally {
        console.log("Cancelled!");
        return Promise.resolve();
      }
    });

    ipcMain.handle("stop", async (event, arg) => {
      console.log("Stopping...");
      try {
        await Bot.closeWindows();
      } catch (err) {
        // catch err
      } finally {
        console.log("Stopped!");
        return Promise.resolve();
      }
    });

    ipcMain.on("quit", (event, arg) => {
      app.quit();
      process.exit(0);
    });

    ipcMain.on("open-link", (event, arg) => {
      shell.openExternal(arg);
    });
  }
}
