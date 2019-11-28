import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { ElectronService } from "../../../../core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["./process.component.scss"]
})
export class ProcessComponent implements OnInit {
  public isStopping: boolean = false;
  public isStoppingError: boolean = false;
  @ViewChild("logBox", { static: false }) logBox: ElementRef<HTMLElement>;

  constructor(
    private _electronService: ElectronService,
    private _router: Router
  ) {}

  ngOnInit() {}

  public async stop(): Promise<void> {
    this.isStopping = true;
    this._electronService.ipcRenderer
      .invoke("stop")
      .then(() => {
        this._router.navigateByUrl("/home/confirmation");
      })
      .catch(err => {
        this.isStopping = false;
        this.isStoppingError = true;
        this._electronService.ipcRenderer.sendSync("quit");
      });
  }

  public test(): void {
    let timestamp = this.createTimestamp();
    this.logBox.nativeElement.append(timestamp + " [STATE] " + "Hallo");
    this.logBox.nativeElement.innerHTML += "<br>";
    this.logBox.nativeElement.scrollTop = this.logBox.nativeElement.scrollHeight;
  }

  private createTimestamp(): string {
    let current = new Date().getTime();
    let hours: number = Math.floor(
      (current % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes: number = Math.floor(
      (current % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds: number = Math.floor((current % (1000 * 60)) / 1000);
    let hoursString: string = hours < 10 ? "0" + hours : hours.toString();
    let minutesString: string =
      minutes < 10 ? "0" + minutes : minutes.toString();
    let secondsString: string =
      seconds < 10 ? "0" + seconds : seconds.toString();
    let timestamp = hoursString + ":" + minutesString + ":" + secondsString;
    return timestamp;
  }
}
