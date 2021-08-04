import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {

  authSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.AUTHENTICATE_SUCCESS),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );

  authIncomplete = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.AUTHENTICATE_INCOMPLETE),
      tap(() => {
        this.router.navigate(['/profile']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router
  ) { }
}
