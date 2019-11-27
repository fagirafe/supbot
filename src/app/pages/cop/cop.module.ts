import { CommonModule } from "@angular/common";
import { CopComponent } from "./cop.component";
import { CopRoutingModule } from "./cop-routing.module";
import { CountdownComponent } from "./components/countdown/countdown.component";
import { NgModule } from "@angular/core";
import { ProcessComponent } from "./components/process/process.component";
import { SharedModule } from "../../shared/shared.module";
import { SummaryComponent } from "./components/summary/summary.component";

@NgModule({
  declarations: [
    CopComponent,
    SummaryComponent,
    ProcessComponent,
    CountdownComponent
  ],
  imports: [CommonModule, CopRoutingModule, SharedModule]
})
export class CopModule {}
