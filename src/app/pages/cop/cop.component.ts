import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";

import { ElectronService } from "../../core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-cop",
  templateUrl: "./cop.component.html",
  styleUrls: ["./cop.component.scss"]
})
export class CopComponent implements OnInit, OnDestroy {
  private summaryListener;

  constructor(
    private _electronService: ElectronService,
    private _router: Router,
    private ngZone: NgZone
  ) {
    this.summaryListener = (event, arg) => {
      if (arg) {
        console.error(arg);
      }
      this.ngZone.run(() => this._router.navigateByUrl("/cop/summary"));
    };
    this._electronService.ipcRenderer.on("summary", this.summaryListener);
  }

  ngOnInit() {}
  ngOnDestroy() {
    this._electronService.ipcRenderer.removeListener(
      "summary",
      this.summaryListener
    );
  }
}
