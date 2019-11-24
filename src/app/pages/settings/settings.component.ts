import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "../../shared/models/app-state";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs/operators";
import * as actions from "./settings.actions";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private _fb: FormBuilder, private _store: Store<AppState>) {}

  ngOnInit() {
    this.settingsForm = this._fb.group({
      testMode: [false, []],
      dropTime: ["12:00:00", [Validators.required]],
      delay: [3000, [Validators.required]],
      priceLimit: [0, []]
    });
    this.onChanges();
  }

  onChanges() {
    this.settingsForm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
      this._store.dispatch(new actions.Set(this.settingsForm.value));
    });
  }
}
