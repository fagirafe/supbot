import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { ItemsComponent } from "./components/items/items.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";

@NgModule({
  declarations: [
    HomeComponent,
    ItemsComponent,
    ProfileComponent,
    ConfirmationComponent
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
