import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebaseui_es from '@ivamuno/firebaseui-es';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { map } from 'rxjs/operators';

import { AuthService } from './interfaces/auth.service';
import { LanguageKeys, LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFirestoreService extends AuthService {
  ui: any;
  language: string;

  constructor(private readonly afAuth: AngularFireAuth, private readonly languageService: LanguageService, router: Router) {
    super(router);

    afAuth.authState.pipe(
      map((u) => {
        if (u) {
          return {
            displayName: u.displayName || '',
            email: u.email || '',
            phoneNumber: u.phoneNumber || '',
            photoURL: u.photoURL || '',
            providerId: u.providerId || '',
            uid: u.uid || '',
          };
        }

        return undefined;
      })
    ).subscribe(u => {
      this.user.next(u);
    });

    this.languageService.isChangedEvent.subscribe((l) => (this.language = l));

    this.underlyingInit();
  }

  protected async underlyingStart(): Promise<void> {
    const app = await this.afAuth.app;
    const uiConfig = {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
      },
    };

    if (this.language === LanguageKeys.Spanish) {
      this.ui = new firebaseui_es.auth.AuthUI(app.auth());
    } else {
      this.ui = new firebaseui.auth.AuthUI(app.auth());
    }

    this.ui.start('#firebaseui-auth-container', uiConfig);
    this.ui.disableAutoSignIn();
  }

  protected async underlyingCancel(): Promise<void> {
    this.ui.delete();
  }

  protected async underlyingLogout(): Promise<void> {
    await this.afAuth.signOut();
  }

  private onLoginSuccessful(authResult: any): boolean {
    this.isAuthenticatingEvent.next(false);

    // It means, no redirection is required.
    return false;
  }
}
