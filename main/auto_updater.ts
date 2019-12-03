import { FeedURLOptions, MessageBoxOptions, autoUpdater } from "electron";

import { dialog } from "electron";
import { version } from "../package.json";

export default class AutoUpdater {
  private static FEED_URL_OPTIONS: FeedURLOptions = {
    url:
      "https://api.update.rocks/update/github.com/blaueeiner/supbot/stable/" +
      process.platform +
      "/" +
      version
  };

  private static onUpdateDownloaded(event, releaseNotes, releaseName) {
    const dialogOpts: MessageBoxOptions = {
      type: "question",
      buttons: ["Update", "Later"],
      defaultId: 0,
      title: "Update available",
      message: `Version ${releaseName} is available, do you want to install it now?`
    };

    dialog.showMessageBox(dialogOpts).then(returnValue => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  }
  private static onUpdateError(err) {
    console.log(err);
    dialog.showErrorBox("Update error", err);
  }

  public static init() {
    if (process.platform === "linux") {
      console.log("Auto updates not available on linux");
    } else {
      autoUpdater.on("error", AutoUpdater.onUpdateError);
      autoUpdater.on("update-downloaded", AutoUpdater.onUpdateDownloaded);
      autoUpdater.setFeedURL(AutoUpdater.FEED_URL_OPTIONS);
      autoUpdater.checkForUpdates();
    }
  }
}
