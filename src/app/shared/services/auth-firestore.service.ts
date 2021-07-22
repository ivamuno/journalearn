import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from './interfaces/user-info';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AuthService } from './interfaces/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFirestoreService extends AuthService {
  ui: firebaseui.auth.AuthUI;

  isAuthenticatingEvent = new EventEmitter<boolean>();
  isAuthenticatedEvent = new EventEmitter<boolean>();

  user = new Observable<UserInfo | undefined>();

  constructor(
    private readonly afAuth: AngularFireAuth,
    router: Router
  ) {
    super(router);

    this.user = afAuth.authState.pipe(
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
    );

    this.underlyingInit();
  }

  protected async underlyingStart(): Promise<void> {    
    const app = await this.afAuth.app;
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
      },
    };

    this.ui = new firebaseui.auth.AuthUI(app.auth());
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
    this.isAuthenticatingEvent.emit(false);
    return true;
  }
}
