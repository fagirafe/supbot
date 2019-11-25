import { CommonModule } from "@angular/common";
import { CountdownComponent } from "./countdown.component";
import { CountdownRoutingModule } from "./countdown-routing.module";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [CountdownComponent],
  imports: [CommonModule, CountdownRoutingModule, SharedModule]
})
export class CountdownModule {}
