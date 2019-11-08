import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./pages/home/home.module#HomeModule"
  },
  {
    path: "history",
    loadChildren: "./pages/history/history.module#HistoryModule"
  },
  {
    path: "settings",
    loadChildren: "./pages/settings/settings.module#SettingsModule"
  },
  {
    path: "news",
    loadChildren: "./pages/news/news.module#NewsModule"
  },
  {
    path: "about",
    loadChildren: "./pages/about/about.module#AboutModule"
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
