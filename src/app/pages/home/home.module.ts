import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { ItemsComponent } from "./components/items/items.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { SharedModule } from "../../shared/shared.module";

import { StoreModule } from "@ngrx/store";
import { itemReducer } from "./components/items/item.reducer";

@NgModule({
  declarations: [
    HomeComponent,
    ItemsComponent,
    ProfileComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    StoreModule.forFeature("item", itemReducer)
  ]
})
export class HomeModule {}
