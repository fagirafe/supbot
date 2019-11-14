import * as actions from "./settings.actions";
import { Settings } from "../../shared/models/settings";

export function settingsReducer(
  state: Settings,
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
