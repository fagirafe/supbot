import { filter, first } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor() {}

  public getValue(observable: Observable<any>): Promise<any> {
    return observable
      .pipe(
        filter(value => value !== null && value !== undefined),
        first()
      )
      .toPromise();
  }
}
