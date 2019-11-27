import { Component, OnInit } from "@angular/core";

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
}
