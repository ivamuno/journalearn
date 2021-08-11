import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import firebase from 'firebase/app';
import * as firebaseui_es from '@ivamuno/firebaseui-es';
import * as firebaseui from 'firebaseui';

import { AuthService } from '../interfaces/auth.service';
import { LanguageKeys, LanguageService } from '../language.service';

import * as fromApp from '../../../store/app.reducer';
import { UserInfo } from '../models/user-info.model';
import { map } from 'rxjs/operators';
import { ProfileStoreService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthFirestoreService extends AuthService {
  ui: any;
  language: string;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly languageService: LanguageService,
    store: Store<fromApp.AppState>,
    profileStoreService: ProfileStoreService
  ) {
    super(store, profileStoreService);

    this.languageService.isChangedEvent.subscribe((l) => (this.language = l));
  }

  protected async underlyingInit(): Promise<void> {
    const userInfo = await this.afAuth.authState.pipe(
      map((firebaseUser) => {
        if (firebaseUser) {
          return this.convertFirebaseUser2UserInfo(firebaseUser)
        }

        return undefined;
      })
    ).toPromise();

    if (!userInfo) {
      return;
    }

    await this.complete(userInfo);
  }

  protected async underlyingStart(): Promise<void> {
    try {
      await this.uiStart();
    } catch (error) {
      await this.afAuth.signOut();
      await this.uiStart();
    }
  }

  protected async underlyingCancel(): Promise<void> {
    if (this.ui) {
      this.ui.delete();
    }
  }

  protected async underlyingLogout(): Promise<void> {
    await this.afAuth.signOut();
  }

  private async uiStart(): Promise<void> {
    const app = await this.afAuth.app;
    const uiConfig = {
      signInOptions: [{
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }],
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

  private onLoginSuccessful(authResult: any): boolean {
    this.complete(this.convertFirebaseUser2UserInfo(authResult.user)).then(_ => { });

    // It means, no redirection is required.
    return false;
  }

  private convertFirebaseUser2UserInfo(firebaseUser: firebase.User): UserInfo {
    return new UserInfo(
      firebaseUser.email || '',
      '',
      '',
      '',
      firebaseUser.phoneNumber || '',
      firebaseUser.photoURL || '',
      firebaseUser.providerId || '',
      firebaseUser.uid || '',
      undefined
    );
  }
}
