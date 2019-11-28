import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";

import { ElectronService } from "../../../../core/services";
import { ProcessLog } from "../../../../shared/models/process_log";
import { Router } from "@angular/router";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.scss"]
})
export class ProcessComponent implements OnInit, OnDestroy {
  public isStopping: boolean = false;
  public isFinished: boolean = false;
  private processLogListener;
  @ViewChild("logBox", { static: false }) logBox: ElementRef<HTMLElement>;

  constructor(
    private _electronService: ElectronService,
    private _router: Router,
    private _ngZone: NgZone
  ) {
    this.processLogListener = (event, arg: ProcessLog) => {
      this.log(arg);
      if (arg.type == "FINISHED") {
        this._ngZone.run(() => {
          this.isFinished = true;
        });
      }
    };
    this._electronService.ipcRenderer.on(
      "process-log",
      this.processLogListener
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._electronService.ipcRenderer.removeListener(
      "process-log",
      this.processLogListener
    );
  }

  public async stop(): Promise<void> {
    this.isStopping = true;
    this._electronService.ipcRenderer
      .invoke("stop")
      .then(() => {
        this._router.navigateByUrl("/home/confirmation");
      })
      .catch(err => {
        this.isStopping = false;
        this._electronService.ipcRenderer.sendSync("quit");
      });
  }

  private log(logObj: ProcessLog): void {
    this.logBox.nativeElement.append(
      logObj.timestamp + " [" + logObj.type + "] " + logObj.message
    );
    this.logBox.nativeElement.innerHTML += "<br>";
    this.logBox.nativeElement.scrollTop = this.logBox.nativeElement.scrollHeight;
  }
}
