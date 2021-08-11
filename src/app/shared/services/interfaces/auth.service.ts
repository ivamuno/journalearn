import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as ProfileActions from '../../../profile/store/profile.actions';
import { ProfileStoreService } from './profile-service';
import { UserInfo } from '..';
import { first } from 'rxjs/operators';

export abstract class AuthService {
  isAuthenticatingEvent = new BehaviorSubject<boolean>(false);
  isAuthenticatedEvent = new BehaviorSubject<boolean>(false);

  constructor(
    protected store: Store<fromApp.AppState>,
    private readonly profileStoreService: ProfileStoreService
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
    this.store.dispatch(new ProfileActions.Logout());
    this.underlyingLogout();
  }

  protected abstract underlyingLogout(): Promise<void>;

  protected async complete(userInfo: UserInfo): Promise<void> {
    try {
      const profile = await this.profileStoreService.get(userInfo.uid).pipe(first()).toPromise();
      if (profile && profile.firstName) {
        this.store.dispatch(new ProfileActions.ProfileComplete({ profile }));
      } else {
        this.store.dispatch(new ProfileActions.ProfileIncomplete({ profile: userInfo }));
      }
    } catch (error) {
      this.store.dispatch(new ProfileActions.ProfileFails(error));
    }

    this.isAuthenticatingEvent.next(false);
  }
}
