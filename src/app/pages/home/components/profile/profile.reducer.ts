import * as actions from "./profile.actions";

import { Profile } from "../../../../shared/models/profile";

const defaultProfile: Profile = {
  profileName: "",
  fullName: "",
  email: "",
  tel: "",
  address: "",
  city: "",
  zip: "",
  country: "DE",
  type: "",
  cardNumber: "",
  expMonth: "01",
  expYear: "2019",
  CVV: "",
  terms: false
};

export function profileReducer(
  state: Profile = defaultProfile,
  action: actions.ProfileActions
) {
  switch (action.type) {
    case actions.ActionTypes.SET:
      return action.profile;
    case actions.ActionTypes.CLEAR:
      return null;
    default:
      return state;
  }
}
