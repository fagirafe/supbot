import { Component, OnInit } from "@angular/core";

import { AppState } from "../../../../shared/models/app-state";
import { ElectronService } from "../../../../core/services";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent implements OnInit {
  items$: Observable<any>;

  constructor(
    private _electronService: ElectronService,
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  ngOnInit() {
    this.items$ = this._store.select("items");
  }

  public start() {
    this._electronService.ipcRenderer.send("prepare");
    this._router.navigateByUrl("/countdown");
  }
}
