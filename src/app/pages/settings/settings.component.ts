import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../shared/models/app-state";
import * as actions from "./settings.actions";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
      testMode: [false, []],
      dropTime: ["12:00:00", [Validators.required]],
      delay: ["3000", [Validators.required]],
      priceLimit: ["", []]
    });
    this.onChanges();
  }

  onChanges() {
    this.settingsForm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
      this.store.dispatch(new actions.Set(this.settingsForm.value));
    });
  }
}
