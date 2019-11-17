import { Component, OnInit } from "@angular/core";
import { ElectronService } from "../../../../core/services";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../shared/models/app-state";
import { Observable } from "rxjs";
import { filter, first } from "rxjs/operators";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent implements OnInit {
  items$: Observable<any>;
  profile$: Observable<any>;
  settings$: Observable<any>;

  constructor(
    private electronService: ElectronService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.items$ = this.store.select("items");
    this.profile$ = this.store.select("profile");
    this.settings$ = this.store.select("settings");
  }

  async test() {
    const stateObj = {
      items: await this.getValue(this.items$),
      profile: await this.getValue(this.profile$),
      settings: await this.getValue(this.settings$)
    };
    console.log(stateObj);
    this.electronService.ipcRenderer.send("test", stateObj);
  }

  getValue(observable: Observable<any>): Promise<any> {
    return observable
      .pipe(
        filter(value => value !== null && value !== undefined),
        first()
      )
      .toPromise();
  }
}
