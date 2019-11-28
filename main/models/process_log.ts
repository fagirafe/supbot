import { ProcessLogger } from "../process_logger";

export interface ProcessLog {
  type: ProcessLogger.LogType;
  timestamp: string;
  message: string;
}
