import Main from "./electron-main";
import { ProcessLog } from "./models/process_log";

export namespace ProcessLogger {
  export enum LogType {
    State = "[STATE]",
    Info = "[INFO]",
    Error = "[ERROR]"
  }

  export function log(logObj: ProcessLog) {
    Main.mainWindow.webContents.send("process-log", logObj);
  }
}
