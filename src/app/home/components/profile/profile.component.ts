import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isNewProfile: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
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
  }

  toggleProfileType() {
    let profileNameFormControl = this.profileForm.get("profileName");
    profileNameFormControl.reset();
    this.isNewProfile = !this.isNewProfile;
  }
}
