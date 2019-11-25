import { RouterModule, Routes } from "@angular/router";

import { CountdownComponent } from "./countdown.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: CountdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountdownRoutingModule {}
