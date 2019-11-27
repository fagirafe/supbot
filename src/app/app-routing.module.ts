import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./shared/components";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "history",
    loadChildren: () =>
      import("./pages/history/history.module").then(m => m.HistoryModule)
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./pages/settings/settings.module").then(m => m.SettingsModule)
  },
  {
    path: "news",
    loadChildren: () =>
      import("./pages/news/news.module").then(m => m.NewsModule)
  },
  {
    path: "about",
    loadChildren: () =>
      import("./pages/about/about.module").then(m => m.AboutModule)
  },
  {
    path: "add-item",
    loadChildren: () =>
      import("./pages/add-item/add-item.module").then(m => m.AddItemModule)
  },
  {
    path: "cop",
    loadChildren: () => import("./pages/cop/cop.module").then(m => m.CopModule)
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
