import { Action } from "@ngrx/store";
import { Settings } from "../../shared/models/settings";

export enum ActionTypes {
  SET = "[Settings] Set settings",
  CLEAR = "[Settings] Clear settings"
}

export class Set implements Action {
  readonly type = ActionTypes.SET;
  constructor(public settings: Settings) {}
}

export class Clear implements Action {
  readonly type = ActionTypes.CLEAR;
  constructor() {}
}

export type SettingsActions = Set | Clear;
