import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from '../interfaces/auth.service';
import * as fromApp from '../../../store/app.reducer';
import * as ProfileActions from '../../../profile/store/profile.actions';
import { LanguageKeys } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService extends AuthService {
  constructor(store: Store<fromApp.AppState>) {
    super(store);
  }

  protected async underlyingInit(): Promise<void> {
  }

  protected async underlyingStart(): Promise<void> {
    const container = document.querySelector('#firebaseui-auth-container');
    if (container) {
      container.innerHTML =
        `<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in">` +
        `<form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in with mock</h1></div>` +
        `<div class="firebaseui-card-actions"><div class="firebaseui-form-actions">` +
        `<button id="firebaseui-auth-container-complete" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored" data-upgraded=",MaterialButton">Complete</button>` +
        `<button id="firebaseui-auth-container-incomplete" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored" data-upgraded=",MaterialButton">Incomplete</button>` +
        `</div></div></form></div>`;
      const buttonComplete = document.querySelector('#firebaseui-auth-container-complete');
      buttonComplete?.addEventListener('click', this.onCompleteLoginSuccessful.bind(this));
      const buttonIncomplete = document.querySelector('#firebaseui-auth-container-incomplete');
      buttonIncomplete?.addEventListener('click', this.onIncompleteLoginSuccessful.bind(this));
    }
  }

  protected async underlyingCancel(): Promise<void> { }

  protected async underlyingLogout(): Promise<void> { }

  private onCompleteLoginSuccessful(): void {
    console.log('dispatch AuthenticateIncomplete onLoginSuccessful')
    this.store.dispatch(new ProfileActions.AuthenticateSuccess({
      profile: {
        email: 'complete@email.com',
        firstName: 'User',
        lastName: 'Complete',
        phoneNumber: '999 66 66 66',
        photoURL: '',
        providerId: '',
        uid: 'COMP00pndUbBW8W7Xgc51lWNAqC3',
        language: {
          native: { key: LanguageKeys.English, name: '', path: '' },
          write: { key: LanguageKeys.English, name: '', path: '' }
        },
        isComplete: true
      }
    }));
    this.isAuthenticatingEvent.next(false);
  }

  private onIncompleteLoginSuccessful(): void {
    console.log('dispatch AuthenticateIncomplete onLoginSuccessful')
    this.store.dispatch(new ProfileActions.AuthenticateIncomplete({
      profile: {
        email: 'incomplete@email.com',
        firstName: 'User',
        lastName: 'Incomplete',
        phoneNumber: '666 77 77 77',
        photoURL: '',
        providerId: '',
        uid: 'INCOMP99aERT9984asXCsd6156aa',
        language: {
          native: { key: LanguageKeys.English, name: '', path: '' },
          write: { key: LanguageKeys.English, name: '', path: '' }
        },
        isComplete: false
      }
    }));
    this.isAuthenticatingEvent.next(false);
  }
}
