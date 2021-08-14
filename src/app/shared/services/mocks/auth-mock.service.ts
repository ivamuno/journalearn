import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { AuthService, UserInfo, LanguageKeys, LanguageService, ProfileStoreService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService extends AuthService {
  constructor(store: Store<fromApp.AppState>, profileStoreService: ProfileStoreService) {
    super(store, profileStoreService);
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
        `<button id="firebaseui-auth-container-error" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored" data-upgraded=",MaterialButton">Error</button>` +
        `</div></div></form></div>`;
      const buttonComplete = document.querySelector('#firebaseui-auth-container-complete');
      buttonComplete?.addEventListener('click', this.onCompleteLogin.bind(this));
      const buttonIncomplete = document.querySelector('#firebaseui-auth-container-incomplete');
      buttonIncomplete?.addEventListener('click', this.onIncompleteLogin.bind(this));
      const buttonError = document.querySelector('#firebaseui-auth-container-error');
      buttonError?.addEventListener('click', this.onErrorLogin.bind(this));
    }
  }

  protected async underlyingCancel(): Promise<void> {}

  protected async underlyingLogout(): Promise<void> {}

  private async onCompleteLogin(): Promise<void> {
    await this.complete(
      new UserInfo('complete@email.com', 'User', 'Complete', '', '999 66 66 66', '', '', 'COMP00pndUbBW8W7Xgc51lWNAqC3', {
        native: LanguageService.getLanguageByKey(LanguageKeys.Spanish),
        write: LanguageService.getLanguageByKey(LanguageKeys.English),
      })
    );
  }

  private async onIncompleteLogin(): Promise<void> {
    await this.complete(new UserInfo('incomplete@email.com', '', '', '', '666 77 77 77', '', '', 'INCOMP99aERT9984asXCsd6156aa', undefined));
  }

  private async onErrorLogin(): Promise<void> {
    await this.complete(new UserInfo('error@email.com', 'User', 'Error', '', '999 66 66 66', '', '', 'COMP00pndUb-error-Xgc51lWNAqC3', undefined));
  }
}
