import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as actions from "../home/components/items/item.actions";
import * as fromItem from "../home/components/items/item.reducer";
import { Store } from "@ngrx/store";
import { Item } from "../../shared/models/item";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"]
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromItem.State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      category: ["new", [Validators.required]],
      keywords: ["", [Validators.required]],
      style: ["", [Validators.required]],
      size: ["", [Validators.required]],
      styleAlternative: ["", []],
      sizeAlternative: ["", []]
    });
  }

  addItem() {
    const item: Item = {
      id: new Date().getUTCMilliseconds().toString(),
      ...this.itemForm.value
    };
    this.store.dispatch(new actions.Add(item));
    this.router.navigateByUrl("/home/items");
  }
}
