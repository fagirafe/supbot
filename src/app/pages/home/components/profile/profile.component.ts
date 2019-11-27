import * as actions from "./profile.actions";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AppState } from "../../../../shared/models/app-state";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UtilsService } from "../../../../core/services/utils/utils.service";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isNewProfile: boolean = false;
  profile$: Observable<any>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    public _utilsService: UtilsService
  ) {}

  async ngOnInit() {
    this.profileForm = this._fb.group({
      profileName: ["", [Validators.required]],
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required]],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      zip: ["", [Validators.required]],
      country: ["DE", [Validators.required]],
      type: ["", [Validators.required]],
      cardNumber: ["", [Validators.required]],
      expMonth: ["01", [Validators.required]],
      expYear: ["2019", [Validators.required]],
      CVV: ["", [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });
    this.onChanges();
    this.profile$ = this._store.select("profile");
    let profileState = await this._utilsService.getValue(this.profile$);
    this.profileForm.patchValue(profileState);
  }

  toggleProfileType() {
    let profileNameFormControl = this.profileForm.get("profileName");
    profileNameFormControl.reset();
    this.isNewProfile = !this.isNewProfile;
  }

  setProfile() {
    this._store.dispatch(new actions.Set(this.profileForm.value));
  }

  clearProfile() {
    this._store.dispatch(new actions.Clear());
  }

  onChanges() {
    this.profileForm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
      this._store.dispatch(new actions.Set(this.profileForm.value));
    });
  }
}
