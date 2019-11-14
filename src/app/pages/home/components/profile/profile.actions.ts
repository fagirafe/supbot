import { Action } from "@ngrx/store";
import { Profile } from "../../../../shared/models/profile";

export enum ActionTypes {
  SET = "[Profile] Set profile",
  CLEAR = "[Profile] Clear profile"
}

export class Set implements Action {
  readonly type = ActionTypes.SET;
  constructor(public profile: Profile) {}
}

export class Clear implements Action {
  readonly type = ActionTypes.CLEAR;
  constructor() {}
}

export type ProfileActions = Set | Clear;
