import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProfileStoreService, ServiceError, } from '../../shared/services';

import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  authSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.AUTHENTICATE_SUCCESS),
      switchMap((a: any, i: number) => {
        const action = a as ProfileActions.AuthenticateSuccess;
        return this.profileStoreService
          .get(action.payload.profile.uid)
          .pipe(
            map(user => {
              if (user && user.firstName) {
                return new ProfileActions.ProfileComplete({ profile: user });
              }

              return new ProfileActions.ProfileIncomplete({ profile: action.payload.profile });
            }),
            catchError((err: ServiceError) => {
              return of(new ProfileActions.ProfileFails(err));
            })
          )
      })
    )
  );

  authComplete = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.PROFILE_COMPLETE),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ),
    { dispatch: false }
  );
  
  authIncomplete = createEffect(
    () => this.actions$.pipe(
      ofType(ProfileActions.PROFILE_INCOMPLETE),
      tap(() => {
        this.router.navigate(['/profile']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly profileStoreService: ProfileStoreService
  ) { }
}
