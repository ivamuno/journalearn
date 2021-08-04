import { UserInfo } from "../../shared/services";
import * as ProfileActions from "./profile.actions";

export interface ProfileState {
  profile: UserInfo | undefined;
}

const initialState: ProfileState = {
  profile: undefined
};

export function profileReducer(
  state: ProfileState = initialState,
  action: any
): ProfileState {
  console.log('profileReducer', state, action);
  switch (action.type) {
    case ProfileActions.AUTHENTICATE_SUCCESS:
    case ProfileActions.AUTHENTICATE_INCOMPLETE:
      return {
        ...state,
        profile: action.payload.profile
      };
    case ProfileActions.LOGOUT:
      return {
        ...state,
        profile: undefined
      };
    default:
      return state;
  }
}
