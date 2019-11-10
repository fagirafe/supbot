import { Action } from "@ngrx/store";
import { Item } from "../../../../shared/models/item";

export enum ActionTypes {
  ADD = "[Items] Added item",
  REMOVE = "[Items] Removed item"
}

export class Add implements Action {
  readonly type = ActionTypes.ADD;
  constructor(public item: Item) {}
}

export class Remove implements Action {
  readonly type = ActionTypes.REMOVE;
  constructor(public id: string) {}
}

export type ItemActions = Add | Remove;
