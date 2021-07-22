import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class UserInfo {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticatingEvent = new EventEmitter<boolean>();
  isAuthenticatedEvent = new EventEmitter<boolean>();

  user = new Observable<UserInfo | undefined>();

  constructor(private readonly afAuth: AngularFireAuth, private readonly router: Router) {
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

    this.user.subscribe(async (u) => {
      this.isAuthenticatedEvent.emit(!!u);
    });
  }

  public openModal(): void {
    this.isAuthenticatingEvent.emit(true);
  }

  public closeModal(): void {
    this.isAuthenticatingEvent.emit(false);
  }

  public async logout(): Promise<void> {
    this.router.navigate(['/home']);
    await this.afAuth.signOut();
  }
}
