import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    authService.isAuthenticatingEvent.subscribe((open) => {
      if (open) {
        this.afAuth.app.then((app) => {
          const uiConfig: firebaseui.auth.Config = {
            signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
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

  ngOnDestroy(): void {
    this.close();
  }

  onLoginSuccessful(authResult: any): boolean {
    this.close();
    return true;
  }

  close(): void  {
    this.authService.closeModal();
    this.ui.delete();
  }
}
