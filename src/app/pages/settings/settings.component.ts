import * as actions from "./settings.actions";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AppState } from "../../shared/models/app-state";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UtilsService } from "../../core/services/utils/utils.service";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  settings$: Observable<any>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private _utilsService: UtilsService
  ) {}

  async ngOnInit() {
    this.settingsForm = this._fb.group({
      testMode: [false, []],
      dropTime: ["12:00:00", [Validators.required]],
      delay: [3000, [Validators.required]],
      priceLimit: [0, []]
    });
    this.onChanges();
    this.settings$ = this._store.select("settings");
    let settingsState = await this._utilsService.getValue(this.settings$);
    this.settingsForm.patchValue(settingsState);
  }

  onChanges() {
    this.settingsForm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
      this._store.dispatch(new actions.Set(this.settingsForm.value));
    });
  }
}
