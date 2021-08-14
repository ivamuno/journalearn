import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  profileComplete = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.PROFILE_COMPLETE),
        map((action: any) => {
          return action as ProfileActions.ProfileComplete;
        }),
        tap((action: ProfileActions.ProfileComplete) => {
          localStorage.setItem('profile', JSON.stringify(action.payload.profile));
        })
      ),
    { dispatch: false }
  );

  profileIncomplete = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.PROFILE_INCOMPLETE),
        map((action: any) => {
          return action as ProfileActions.ProfileIncomplete;
        }),
        tap((action: ProfileActions.ProfileIncomplete) => {
          this.router.navigate(['/profile']);
          localStorage.setItem('profile', JSON.stringify(action.payload.profile));
        })
      ),
    { dispatch: false }
  );

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.LOGOUT),
        tap(() => {
          this.router.navigate(['/home']);
          localStorage.setItem('profile', '');
        })
      ),
    { dispatch: false }
  );

  constructor(private readonly actions$: Actions, private readonly router: Router) {}
}
