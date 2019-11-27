import { filter, first } from "rxjs/operators";

import { ElectronService } from "../electron/electron.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor(private _electronService: ElectronService) {}

  public getValue(observable: Observable<any>): Promise<any> {
    return observable
      .pipe(
        filter(value => value !== null && value !== undefined),
        first()
      )
      .toPromise();
  }

  public openLink(link: string) {
    this._electronService.ipcRenderer.send("open-link", link);
  }
}
