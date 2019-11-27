import { Component, OnInit } from "@angular/core";
import { filter, first } from "rxjs/operators";

import { AppState } from "../../../../shared/models/app-state";
import { ElectronService } from "../../../../core/services";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Settings } from "../../../../shared/models/settings";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-countdown",
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.scss"]
})
export class CountdownComponent implements OnInit {
  public countdownTime: string = "00:00:00";
  public items$: Observable<any>;
  public profile$: Observable<any>;
  public settings$: Observable<any>;
  private countdownInterval;

  constructor(
    private _electronService: ElectronService,
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.items$ = this._store.select("items");
    this.profile$ = this._store.select("profile");
    this.settings$ = this._store.select("settings");
    this.startCountdown();
  }

  public parseCountdownString(countdownString: string): number {
    let slicedCountdownString: Array<string> = countdownString.split(":");
    let then: number = new Date().setHours(
      parseInt(slicedCountdownString[0]),
      parseInt(slicedCountdownString[1]),
      parseInt(slicedCountdownString[2])
    );
    return then;
  }

  public async startCountdown(): Promise<void> {
    let settings: Settings = await this._getValue(this.settings$);
    let countdownString: string = settings.dropTime;
    let then: number = this.parseCountdownString(countdownString);
    this.countdownInterval = setInterval(() => {
      let now: number = new Date().getTime();
      let distance: number = then - now;
      let days: number = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours: number = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes: number = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds: number = Math.floor((distance % (1000 * 60)) / 1000);

      let hoursString: string = hours < 10 ? "0" + hours : hours.toString();
      let minutesString: string =
        minutes < 10 ? "0" + minutes : minutes.toString();
      let secondsString: string =
        seconds < 10 ? "0" + seconds : seconds.toString();

      this.countdownTime =
        hoursString + ":" + minutesString + ":" + secondsString;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.countdownTime = "00:00:00";
        this._router.navigateByUrl("/cop/process");
        console.log("Countdown over!");
        return this._cop();
      } else {
        console.log(this.countdownTime);
      }
    }, 1000);
  }

  public cancel() {
    clearInterval(this.countdownInterval);
    this._electronService.ipcRenderer
      .invoke("cancel")
      .then(() => {
        this._router.navigateByUrl("/home/confirmation");
      })
      .catch(err => {
        console.log(err);
      });
  }

  private _getValue(observable: Observable<any>): Promise<any> {
    return observable
      .pipe(
        filter(value => value !== null && value !== undefined),
        first()
      )
      .toPromise();
  }

  private async _cop(): Promise<void> {
    let stateObj = {
      items: await this._getValue(this.items$),
      profile: await this._getValue(this.profile$),
      settings: await this._getValue(this.settings$)
    };
    this._electronService.ipcRenderer.send("start", stateObj);
    this._router.navigateByUrl("/cop/process");
  }
}
