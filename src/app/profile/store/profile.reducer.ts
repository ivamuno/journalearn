import { ServiceError, UserInfo } from "../../shared/services";
import * as ProfileActions from "./profile.actions";

export interface ProfileState {
  profile: UserInfo | undefined;
  error: ServiceError | undefined;
}

const initialState: ProfileState = {
  profile: undefined,
  error: undefined
};

export function profileReducer(
  state: ProfileState = initialState,
  action: any
): ProfileState {
  console.log('profileReducer', action, state);
  switch (action.type) {
    case ProfileActions.PROFILE_COMPLETE:
    case ProfileActions.PROFILE_INCOMPLETE:
    case ProfileActions.PROFILE_UPDATE:
      return {
        ...state,
        profile: JSON.parse(JSON.stringify(action.payload.profile)),
        error: undefined
      };
    case ProfileActions.PROFILE_FAILS:
      return {
        ...state,
        profile: undefined,
        error: action.payload.error
      };
    case ProfileActions.LOGOUT:
      return {
        ...state,
        profile: undefined,
        error: undefined
      };
    default:
      return state;
  }
}
