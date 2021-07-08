import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
@Injectable()
export class AuthComponent implements OnInit, OnDestroy {
  isOpened = false;

  ui: firebaseui.auth.AuthUI;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    authService.isAuthenticating.subscribe((open) => {
      if (open) {
        this.afAuth.app.then((app) => {
          const uiConfig: firebaseui.auth.Config = {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
            },
          };

          this.ui = new firebaseui.auth.AuthUI(app.auth());
          this.ui.start('#firebaseui-auth-container', uiConfig);
          this.ui.disableAutoSignIn();
        });
      }

      this.isOpened = open;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.close();
  }

  onLoginSuccessful(_authResult: any): boolean {
    this.close();
    return true;
  }

  close() {
    this.authService.closeModal();
    this.ui.delete();
  }
}
