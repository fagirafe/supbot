import * as updater from "electron-simple-updater";

import { dialog } from "electron";

export default class AutoUpdater {
  private static onUpdateDownloading(meta) {
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      message: "Version " + meta.version,
      detail: "A new version is downloading in the background."
    };

    dialog.showMessageBox(dialogOpts);
  }
  private static onUpdateDownloaded(meta) {
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      message: "Version " + meta.version,
      detail: "A new version has been downloaded. Restart and install now?"
    };

    dialog.showMessageBox(dialogOpts).then(returnValue => {
      if (returnValue.response === 0) updater.quitAndInstall();
    });
  }
  private static onUpdateError(err) {
    dialog.showErrorBox("Update error", err);
  }

  public static init() {
    updater.init();
    updater.on("update-downloading", AutoUpdater.onUpdateDownloading);
    updater.on("update-downloaded", AutoUpdater.onUpdateDownloaded);
    updater.on("error", AutoUpdater.onUpdateError);
  }
}
