import { Event, NavigationEnd, Router } from "@angular/router";

import { AppConfig } from "../environments/environment";
import { Component } from "@angular/core";
import { ElectronService } from "./core/services";
import { ThrowStmt } from "@angular/compiler";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public showNav: boolean = true;

  constructor(
    public electronService: ElectronService,
    private _translate: TranslateService,
    private _router: Router
  ) {
    _translate.setDefaultLang("en");
    console.log("AppConfig", AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log("Mode electron");
      console.log("Electron ipcRenderer", electronService.ipcRenderer);
      console.log("NodeJS childProcess", electronService.childProcess);
    } else {
      console.log("Mode web");
    }
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == "/countdown") {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      }
    });
  }
}
