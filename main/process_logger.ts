import Main from "./electron_main";
import { ProcessLog } from "./models/process_log";
import { Utils } from "./utils";

export namespace ProcessLogger {
  export enum LogType {
    State = "STATE",
    Info = "INFO",
    Error = "ERROR",
    Finished = "FINISHED"
  }

  export function log(type: LogType, message: string): void {
    let logObj: ProcessLog = {
      type: type,
      timestamp: Utils.createTimestamp(),
      message: message
    };
    Main.mainWindow.webContents.send("process-log", logObj);
  }
}
