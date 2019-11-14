import { ActionReducerMap } from "@ngrx/store";
import { itemReducer } from "../pages/home/components/items/item.reducer";
import { profileReducer } from "../pages/home/components/profile/profile.reducer";
import { settingsReducer } from "../pages/settings/settings.reducer";

export const reducers: ActionReducerMap<any> = {
  item: itemReducer,
  profile: profileReducer,
  settings: settingsReducer
};
