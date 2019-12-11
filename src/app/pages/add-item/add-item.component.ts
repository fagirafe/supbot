import * as actions from "../home/components/items/item.actions";
import * as fromItem from "../home/components/items/item.reducer";

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Item } from "../../shared/models/item";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"]
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromItem.State>,
    private _router: Router
  ) {}

  ngOnInit() {
    this.itemForm = this._fb.group({
      category: ["New", [Validators.required]],
      keywords: ["", [Validators.required]],
      style: ["", [Validators.required]],
      size: ["N/A", [Validators.required]],
      styleAlternative: ["", []],
      sizeAlternative: ["N/A", []]
    });
  }

  addItem() {
    const item: Item = {
      id: uuid(),
      ...this.itemForm.value
    };
    this._store.dispatch(new actions.Add(item));
    this._router.navigateByUrl("/home/items");
  }
}
