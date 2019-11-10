import { ActionReducerMap } from "@ngrx/store";
import { itemReducer } from "../pages/home/components/items/item.reducer";

export const reducers: ActionReducerMap<any> = {
  item: itemReducer
};
