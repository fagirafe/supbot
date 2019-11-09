import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"]
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      category: ["new", [Validators.required]],
      keywords: ["", [Validators.required]],
      style: ["", [Validators.required]],
      size: ["", [Validators.required]],
      styleAlternative: ["", [Validators.required]],
      sizeAlternative: ["", [Validators.required]]
    });
  }
}
