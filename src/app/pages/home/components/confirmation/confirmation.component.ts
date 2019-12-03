import { Component, OnInit } from "@angular/core";

import { AppState } from "../../../../shared/models/app-state";
import { ElectronService } from "../../../../core/services";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { UtilsService } from "../../../../core/services/utils/utils.service";

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
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.items$ = this._store.select("items");
  }

  public async start() {
    let items = await this._utilsService.getValue(this.items$);
    if (
      (items as Object)["entities"][
        Object.keys((items as Object)["entities"])[0]
      ]
    ) {
      this._electronService.ipcRenderer
        .invoke("prepare")
        .then(() => {
          this._router.navigateByUrl("/cop/countdown");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this._router.navigateByUrl("/home/items");
    }
  }
}
