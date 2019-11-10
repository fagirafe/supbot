import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddItemRoutingModule } from "./add-item-routing.module";
import { AddItemComponent } from "./add-item.component";
import { SharedModule } from "../../shared/shared.module";
import { itemReducer } from "../home/components/items/item.reducer";
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [AddItemComponent],
  imports: [
    CommonModule,
    AddItemRoutingModule,
    SharedModule,
    StoreModule.forFeature("item", itemReducer)
  ]
})
export class AddItemModule {}
