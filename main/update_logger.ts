import Main from "./electron_main";

export namespace UpdateLogger {
  export function log(message: string): void {
    Main.mainWindow.webContents.send("update-log", message);
  }
}
