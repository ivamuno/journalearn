import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../interfaces/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthMockService extends AuthService {
  constructor(router: Router) {
    super(router);

    this.user = of({
      displayName: 'Display Name',
      email: 'email@email.com',
      phoneNumber: '999 66 66 66',
      photoURL: '',
      providerId: '',
      uid: 'FAKE00pndUbBW8W7Xgc51lWNAqC3',
    });

    this.underlyingInit();
  }

  protected underlyingStart(): void {
    const container = document.querySelector('#firebaseui-auth-container');
    if (container) {
      container.innerHTML =
        `<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in">` +
        `<form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Sign in with mock</h1></div>` +
        `<div class="firebaseui-card-actions"><div class="firebaseui-form-actions">` +
        `<button id="firebaseui-auth-container-next" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored" data-upgraded=",MaterialButton">Next</button>` +
        `</div></div></form></div>`;
      const buttonNext = document.querySelector('#firebaseui-auth-container-next');
      buttonNext?.addEventListener('click', this.onLoginSuccessful.bind(this));
    }
  }

  protected underlyingCancel(): void {}

  protected underlyingLogout(): void {
    this.isAuthenticatedEvent.emit(false);
  }

  private onLoginSuccessful(): void {
    this.isAuthenticatingEvent.emit(false);
    this.isAuthenticatedEvent.emit(true);
  }
}
