import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  profileComplete = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.PROFILE_COMPLETE),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  profileIncomplete = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.PROFILE_INCOMPLETE),
      tap(() => {
        this.router.navigate(['/profile']);
      })
    ),
    { dispatch: false }
  );

  logout = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.LOGOUT),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) { }
}
