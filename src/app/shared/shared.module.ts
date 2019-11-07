import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule } from "@angular/forms";
import { SupButtonComponent } from "./components/sup-button/sup-button.component";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, SupButtonComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, SupButtonComponent]
})
export class SharedModule {}
