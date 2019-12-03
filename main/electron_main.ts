import * as path from "path";
import * as url from "url";

import AutoUpdater from "./auto_updater";
import { BrowserWindow } from "electron";

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static serve: boolean;
  static BrowserWindow;

  private static createWindow() {
    Main.mainWindow = new Main.BrowserWindow({
      x: 0,
      y: 0,
      width: 900,
      height: 800,
      minWidth: 900,
      minHeight: 800,
      webPreferences: {
        nodeIntegration: true
      }
    });
    if (Main.serve) {
      require("electron-reload")(__dirname, {
        electron: require(`${__dirname}/../../node_modules/electron`)
      });
      Main.mainWindow.loadURL("http://localhost:4200");
      Main.mainWindow.webContents.openDevTools();
    } else {
      Main.mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "/../../dist/index.html"),
          protocol: "file:",
          slashes: true
        })
      );
      Main.mainWindow.setAutoHideMenuBar(true);
      if (require("electron-squirrel-startup")) {
        Main.application.quit();
        process.exit(0);
      }
      if (process.platform === "win32") {
        var cmd = process.argv[1];
        if (cmd === "--squirrel-firstrun") {
          return;
        }
      }
      Main.mainWindow.webContents.once("did-frame-finish-load", event => {
        AutoUpdater.init();
      });
    }
    Main.mainWindow.on("closed", Main.onClose);
  }

  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      Main.application.quit();
      process.exit(0);
    }
  }

  private static onClose() {
    // Dereference the window object.
    Main.mainWindow = null;
    Main.application.quit();
    process.exit(0);
  }

  private static onReady() {
    Main.createWindow();
  }

  private static onActivate() {
    if (Main.mainWindow === null) {
      Main.createWindow();
    }
  }

  public static main(
    app: Electron.App,
    browserWindow: typeof BrowserWindow,
    serve: boolean
  ) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.serve = serve;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("activate", Main.onActivate);
    Main.application.on("ready", Main.onReady);
  }
}
