import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from './user-info.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  isAuthenticating = new EventEmitter<boolean>();
  isAuthenticated = new EventEmitter<boolean>();
  user = new Observable<UserInfo>();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState.pipe(
      map((u) => {
        return {
          displayName: u?.displayName || '',
          email: u?.email || '',
          phoneNumber: u?.phoneNumber || '',
          photoURL: u?.photoURL || '',
          providerId: u?.providerId || '',
          uid: u?.uid || '',
        };
      })
    );

    this.user.subscribe(async (u) => {
      this.isAuthenticated.emit(u.uid !== '');
    });
  }

  public openModal(): void {
    this.isAuthenticating.emit(true);
  }

  public closeModal(): void {
    this.isAuthenticating.emit(false);
  }

  public async logout(): Promise<void> {
    this.router.navigate(['/home']);
    await this.afAuth.signOut();
  }
}
