import { ActionReducerMap } from '@ngrx/store';

import * as fromProfile from '../profile/store/profile.reducer';

export interface AppState {
  profileState: fromProfile.ProfileState;
}

export const appReducer: ActionReducerMap<AppState> = {
  profileState: fromProfile.profileReducer
};
