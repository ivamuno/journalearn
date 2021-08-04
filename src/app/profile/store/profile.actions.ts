import { Action } from '@ngrx/store';

import { UserInfo } from '../../shared/services';

export const AUTHENTICATE_SUCCESS: string = '[Auth] Success';
export const AUTHENTICATE_INCOMPLETE: string = '[Auth] Incomplete';
export const LOGOUT: string = '[Auth] Logout';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      profile: UserInfo
    }
  ) { }
}

export class AuthenticateIncomplete implements Action {
  readonly type = AUTHENTICATE_INCOMPLETE;

  constructor(
    public payload: {
      profile: UserInfo
    }
  ) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type ActionType =
  | AuthenticateSuccess
  | AuthenticateIncomplete
  | Logout;
