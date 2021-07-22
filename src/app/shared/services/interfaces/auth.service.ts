import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from './user-info';

export abstract class AuthService {
  isAuthenticatingEvent = new EventEmitter<boolean>();
  isAuthenticatedEvent = new EventEmitter<boolean>();

  user = new Observable<UserInfo | undefined>();

  constructor(
    protected readonly router: Router
  ) {
  }

  protected underlyingInit(): void {
    this.user.subscribe(async (u) => {
      this.isAuthenticatedEvent.emit(!!u);
    });
  }

  public async start(): Promise<void> {
    this.isAuthenticatingEvent.emit(true);
    this.underlyingStart();
  }

  protected abstract underlyingStart(): void;

  public async cancel(): Promise<void> {
    this.isAuthenticatingEvent.emit(false);
    this.underlyingCancel();
  }

  protected abstract underlyingCancel(): void;

  public async logout(): Promise<void> {
    this.router.navigate(['/home']);
    this.underlyingLogout();
  }

  protected abstract underlyingLogout(): void;
}
