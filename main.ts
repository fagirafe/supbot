import * as path from "path";
import * as puppeteer from "puppeteer-core";
import * as url from "url";

import { BrowserWindow, app, ipcMain, screen, shell } from "electron";

import { Bot } from "./main/index";
import Main from "./main/electron-main";
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

Main.main(app, BrowserWindow, serve);

// function createWindow() {
//   const electronScreen = screen;
//   const size = electronScreen.getPrimaryDisplay().workAreaSize;

//   // Create the browser window.
//   win = new BrowserWindow({
//     x: 0,
//     y: 0,
//     width: 900,
//     height: 800,
//     minWidth: 900,
//     minHeight: 800,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   });

//   if (serve) {
//     require("electron-reload")(__dirname, {
//       electron: require(`${__dirname}/../node_modules/electron`)
//     });
//     win.loadURL("http://localhost:4200");
//   } else {
//     win.loadURL(
//       url.format({
//         pathname: path.join(__dirname, "/../dist/index.html"),
//         protocol: "file:",
//         slashes: true
//       })
//     );
//   }

//   if (serve) {
//     win.webContents.openDevTools();
//   } else {
//     win.setAutoHideMenuBar(true);
//   }

//   // Emitted when the window is closed.
//   win.on("closed", () => {
//     // Dereference the window object, usually you would store window
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     win = null;
//     app.quit();
//   });
// }

// try {
//   // This method will be called when Electron has finished
//   // initialization and is ready to create browser windows.
//   // Some APIs can only be used after this event occurs.
//   app.on("ready", () => {
//     createWindow();
//   });

//   // Quit when all windows are closed.
//   app.on("window-all-closed", () => {
//     // On OS X it is common for applications and their menu bar
//     // to stay active until the user quits explicitly with Cmd + Q
//     if (process.platform !== "darwin") {
//       app.quit();
//     }
//   });

//   app.on("activate", () => {
//     // On OS X it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (win === null) {
//       createWindow();
//     }
//   });
// } catch (e) {
//   // Catch Error
//   // throw e;
// }

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
    win.webContents.send("summary", err);
  }
  win.webContents.send("summary");
});

ipcMain.on("prepare", async (event, arg) => {
  console.log("Preparing...");
  try {
    await Bot.init(pieBrowser);
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
