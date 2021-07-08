import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInfo } from './user-info.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  isAuthenticating = new EventEmitter<boolean>();
  isAuthenticated = new EventEmitter<boolean>();
  user = new EventEmitter<UserInfo>();
  token = new EventEmitter<string>();

  constructor(private afAuth: AngularFireAuth) {
    const user = afAuth.authState.pipe(map((user) => user));
    user.subscribe(async (u) => {
      this.isAuthenticated.emit(!!u);
      this.user.emit({
        displayName: u?.displayName || '',
        email: u?.email || '',
        phoneNumber: u?.phoneNumber || '',
        photoURL: u?.photoURL || '',
        providerId: u?.providerId || '',
        uid: u?.uid || '',
      });
      this.token.emit(await u?.getIdToken());
    });
  }

  public openModal(): void {
    this.isAuthenticating.emit(true);
  }

  public closeModal(): void {
    this.isAuthenticating.emit(false);
  }

  public async logout(): Promise<void> {
    await this.afAuth.signOut();
  }
}
