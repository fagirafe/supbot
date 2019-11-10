import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SupButtonComponent } from "./components/sup-button/sup-button.component";
import { FirstLetterUpperPipe } from "./pipes/first-letter-upper.pipe";
import { ItemsListComponent } from "./components/items-list/items-list.component";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    SupButtonComponent,
    FirstLetterUpperPipe,
    ItemsListComponent
  ],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    SupButtonComponent,
    FirstLetterUpperPipe,
    ItemsListComponent
  ]
})
export class SharedModule {}
