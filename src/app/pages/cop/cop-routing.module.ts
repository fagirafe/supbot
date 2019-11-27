import { RouterModule, Routes } from "@angular/router";

import { CopComponent } from "./cop.component";
import { CountdownComponent } from "./components/countdown/countdown.component";
import { NgModule } from "@angular/core";
import { ProcessComponent } from "./components/process/process.component";
import { SummaryComponent } from "./components/summary/summary.component";

const routes: Routes = [
  {
    path: "",
    component: CopComponent,
    children: [
      {
        path: "",
        redirectTo: "countdown",
        pathMatch: "full"
      },
      {
        path: "countdown",
        component: CountdownComponent
      },
      {
        path: "process",
        component: ProcessComponent
      },
      {
        path: "summary",
        component: SummaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopRoutingModule {}
