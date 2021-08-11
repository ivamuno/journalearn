import { Action } from '@ngrx/store';

import { ServiceError, UserInfo } from '../../shared/services';

export const PROFILE_COMPLETE: string = '[Profile] Complete';
export const PROFILE_UPDATE: string = '[Profile] Update';
export const PROFILE_INCOMPLETE: string = '[Profile] Incomplete';
export const PROFILE_FAILS: string = '[Profile] Fails';
export const LOGOUT: string = '[Profile] Logout';

export class ProfileComplete implements Action {
  readonly type = PROFILE_COMPLETE;

  constructor(
    public payload: {
      profile: UserInfo
    }
  ) { }
}

export class ProfileIncomplete implements Action {
  readonly type = PROFILE_INCOMPLETE;

  constructor(
    public payload: {
      profile: UserInfo
    }
  ) { }
}

export class ProfileUpdate implements Action {
  readonly type = PROFILE_UPDATE;

  constructor(
    public payload: {
      profile: UserInfo
    }
  ) { }
}

export class ProfileFails implements Action {
  readonly type = PROFILE_FAILS;

  constructor(
    public payload: ServiceError
  ) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type ActionType =
  | Logout
  | ProfileComplete
  | ProfileIncomplete
  | ProfileFails;
