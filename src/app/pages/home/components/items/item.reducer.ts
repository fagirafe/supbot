import * as actions from "./item.actions";

import { EntityState, createEntityAdapter } from "@ngrx/entity";

import { Item } from "../../../../shared/models/item";
import { createFeatureSelector } from "@ngrx/store";

export const itemAdapter = createEntityAdapter<Item>();
export interface State extends EntityState<Item> {}

const defaultItems = {
  ids: ["test"],
  entities: {
    test: {
      id: "test",
      category: "Sweatshirts",
      keywords: "Mountain Crewneck",
      style: "Ash Grey",
      size: "Large",
      styleAlternative: "Ash Grey",
      sizeAlternative: "XLarge"
    }
  }
};

export const initialState: State = itemAdapter.getInitialState(defaultItems);

export function itemReducer(
  state: State = initialState,
  action: actions.ItemActions
) {
  switch (action.type) {
    case actions.ActionTypes.ADD:
      return itemAdapter.addOne(action.item, state);
    case actions.ActionTypes.REMOVE:
      return itemAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getItemState = createFeatureSelector<State>("items");

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = itemAdapter.getSelectors(getItemState);
