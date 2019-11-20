import * as actions from "./settings.actions";
import { Settings } from "../../shared/models/settings";

const defaultSettings: Settings = {
  testMode: false,
  dropTime: "12:00:00",
  delay: "3000",
  priceLimit: ""
};

export function settingsReducer(
  state: Settings = defaultSettings,
  action: actions.SettingsActions
) {
  switch (action.type) {
    case actions.ActionTypes.SET:
      return action.settings;
    case actions.ActionTypes.CLEAR:
      return null;
    default:
      return state;
  }
}
