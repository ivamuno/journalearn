import { Action } from '@ngrx/store';

import { ServiceError, UserInfo } from '../../shared/services';

export const AUTHENTICATE_SUCCESS: string = '[Profile] Auth Success';
export const PROFILE_COMPLETE: string = '[Profile] Complete';
export const PROFILE_INCOMPLETE: string = '[Profile] Incomplete';
export const PROFILE_FAILS: string = '[Profile] Fails';
export const LOGOUT: string = '[Profile] Logout';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      profile: UserInfo
    }
  ) { }
}

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
  | AuthenticateSuccess
  | Logout
  | ProfileComplete
  | ProfileIncomplete
  | ProfileFails;
