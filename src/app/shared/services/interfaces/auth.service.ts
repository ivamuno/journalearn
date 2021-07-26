import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserInfo } from './user-info';

export abstract class AuthService {
  isAuthenticatingEvent = new BehaviorSubject<boolean>(false);
  isAuthenticatedEvent = new BehaviorSubject<boolean>(false);

  user = new BehaviorSubject<UserInfo | undefined>(undefined);

  constructor(protected readonly router: Router) { }

  protected underlyingInit(): void {
    this.user.subscribe(async (u) => {
      this.isAuthenticatedEvent.next(!!u);
    });
  }

  public async start(): Promise<void> {
    this.isAuthenticatingEvent.next(true);
    this.underlyingStart();
  }

  protected abstract underlyingStart(): void;

  public async cancel(): Promise<void> {
    this.isAuthenticatingEvent.next(false);
    this.underlyingCancel();
  }

  protected abstract underlyingCancel(): void;

  public async logout(): Promise<void> {
    this.router.navigate(['/home']);
    this.underlyingLogout();
  }

  protected abstract underlyingLogout(): void;
}
