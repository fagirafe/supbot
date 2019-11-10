import { Component, OnInit } from "@angular/core";
import * as actions from "./item.actions";
import * as fromItem from "./item.reducer";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  items$: Observable<any>;

  constructor(private store: Store<fromItem.State>) {}

  ngOnInit() {
    this.items$ = this.store.select(fromItem.selectAll);
  }

  removeItem(id: string) {
    this.store.dispatch(new actions.Remove(id));
  }
}
