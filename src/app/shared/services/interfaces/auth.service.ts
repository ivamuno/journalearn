import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';

export abstract class AuthService {
  isAuthenticatingEvent = new BehaviorSubject<boolean>(false);
  isAuthenticatedEvent = new BehaviorSubject<boolean>(false);

  constructor(
    protected store: Store<fromApp.AppState>
  ) {
  }

  public init(): void {
    this.underlyingInit();
  }

  protected abstract underlyingInit(): Promise<void>;

  public async start(): Promise<void> {
    this.isAuthenticatingEvent.next(true);
    this.underlyingStart();
  }

  protected abstract underlyingStart(): Promise<void>;

  public async cancel(): Promise<void> {
    this.isAuthenticatingEvent.next(false);
    this.underlyingCancel();
  }

  protected abstract underlyingCancel(): Promise<void>;

  public async logout(): Promise<void> {
    this.underlyingLogout();
  }

  protected abstract underlyingLogout(): Promise<void>;
}
