import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent implements OnInit {
  confirmationForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.confirmationForm = this.fb.group({
      priceLimit: ["", []]
    });
  }
}
