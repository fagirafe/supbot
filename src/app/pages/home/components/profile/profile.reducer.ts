import * as actions from "./profile.actions";
import { Profile } from "../../../../shared/models/profile";

export function profileReducer(state: Profile, action: actions.ProfileActions) {
  switch (action.type) {
    case actions.ActionTypes.SET:
      return action.profile;
    case actions.ActionTypes.CLEAR:
      return null;
    default:
      return state;
  }
}
