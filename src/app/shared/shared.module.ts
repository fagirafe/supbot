import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SupButtonComponent } from "./components/sup-button/sup-button.component";
import { FirstLetterUpperPipe } from "./pipes/first-letter-upper.pipe";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    SupButtonComponent,
    FirstLetterUpperPipe
  ],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    SupButtonComponent,
    FirstLetterUpperPipe
  ]
})
export class SharedModule {}
