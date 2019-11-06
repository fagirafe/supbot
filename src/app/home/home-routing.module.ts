import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ItemsComponent } from "./components/items/items.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        redirectTo: "items",
        pathMatch: "full"
      },
      {
        path: "items",
        component: ItemsComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "confirmation",
        component: ConfirmationComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
