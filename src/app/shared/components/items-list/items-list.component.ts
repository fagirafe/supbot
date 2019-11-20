import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import * as actions from "../../../pages/home/components/items/item.actions";
import * as fromItem from "../../../pages/home/components/items/item.reducer";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "items-list",
  templateUrl: "./items-list.component.html",
  styleUrls: ["./items-list.component.scss"]
})
export class ItemsListComponent implements OnInit, OnDestroy {
  @Output() itemsCountChanged: EventEmitter<number> = new EventEmitter();
  items$: Observable<any>;

  itemsSubscription: Subscription;

  constructor(private _store: Store<fromItem.State>) {}

  ngOnInit() {
    this.items$ = this._store.select(fromItem.selectAll);
    this.itemsSubscription = this.items$.subscribe(items => {
      this.itemsCountChanged.emit(items.length);
    });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  removeItem(id: string) {
    this._store.dispatch(new actions.Remove(id));
  }
}
