import * as path from "path";
import * as puppeteer from "puppeteer-core";
import * as url from "url";

import { BrowserWindow, app, ipcMain, screen } from "electron";

import { Bot } from "./main/index";
import { PupBrowser } from "./main/pup_browser";
import { async } from "@angular/core/testing";
import pie from "puppeteer-in-electron";

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let win: BrowserWindow, serve: boolean, pieBrowser: puppeteer.Browser;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

(async () => {
  pieBrowser = await pie.connect(app, puppeteer, 3002);
})();

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (serve) {
    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true
      })
    );
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", () => {
    createWindow();
  });

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.on("test", (event, arg) => {
  console.log(arg);
  // event.reply('asynchronous-reply', 'pong')
});

ipcMain.on("start", async (event, arg) => {
  console.log(arg);
  await Bot.start(
    pieBrowser,
    arg["items"]["entities"][Object.keys(arg["items"]["entities"])[0]] !=
      undefined
      ? arg["items"]["entities"][Object.keys(arg["items"]["entities"])[0]]
      : {},
    arg["profile"],
    arg["settings"]
  );
});

ipcMain.on("prepare", async (event, arg) => {
  console.log("Preparing...");
});

ipcMain.handle("cancel", async (event, arg) => {
  console.log("Canceling...");
  return;
});

// async function createPieBrowser() {
//   let browser = await pie.connect(app, puppeteer, 3002);

//   let window = new BrowserWindow();
//   let url = "https://www.supremenewyork.com/";
//   await window.loadURL(url);

//   let page = await pie.getPage(browser, window);
//   page.setUserAgent(
//     "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
//   );
//   console.log(page.url());
//   // window.destroy();
// }
