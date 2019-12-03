import { UpdateInfo, autoUpdater } from "electron-updater";

import { MessageBoxOptions } from "electron";
import { UpdateLogger } from "./update_logger";
import { dialog } from "electron";

export default class AppUpdater {
  private static onUpdateError(err) {
    UpdateLogger.log("Update error.");
    console.log(err);
    dialog.showErrorBox("Update error", err);
  }

  private static onCheckingForUpdate() {
    UpdateLogger.log("Checking for update...");
  }

  private static onUpdateAvailable(info: UpdateInfo) {
    UpdateLogger.log("Update available.");
  }

  private static onUpdateNotAvailable(info: UpdateInfo) {
    UpdateLogger.log("Update not available.");
  }

  private static onDownloadProgress(progressObj: object) {
    let log_message = "Download speed: " + progressObj["bytesPerSecond"];
    log_message = log_message + " - Downloaded " + progressObj["percent"] + "%";
    log_message =
      log_message +
      " (" +
      progressObj["transferred"] +
      "/" +
      progressObj["total"] +
      ")";
    UpdateLogger.log(log_message);
  }

  private static onUpdateDownloaded(info: UpdateInfo) {
    UpdateLogger.log("Update downloaded.");
    const dialogOpts: MessageBoxOptions = {
      type: "question",
      buttons: ["Update", "Later"],
      defaultId: 0,
      title: "Update available",
      message: `Version ${info.version} is available, do you want to install it now?`
    };
    dialog.showMessageBox(dialogOpts).then(returnValue => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  }

  public static init() {
    if (process.platform === "linux") {
      console.log("Auto updates not available on linux");
    } else {
      autoUpdater.on("error", AppUpdater.onUpdateError);
      autoUpdater.on("checking-for-update", AppUpdater.onCheckingForUpdate);
      autoUpdater.on("update-available", AppUpdater.onUpdateAvailable);
      autoUpdater.on("update-not-available", AppUpdater.onUpdateNotAvailable);
      autoUpdater.on("download-progress", AppUpdater.onDownloadProgress);
      autoUpdater.on("update-downloaded", AppUpdater.onUpdateDownloaded);
      autoUpdater.checkForUpdates();
    }
  }
}
