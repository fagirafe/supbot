import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule]
})
export class NewsModule {}
