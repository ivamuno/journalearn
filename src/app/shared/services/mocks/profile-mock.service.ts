import { from, Observable } from 'rxjs';
import { LanguageKeys, LanguageService, ProfileStoreService, UserInfo, ServiceError } from '..';

export class ProfileMockService extends ProfileStoreService {
  private readonly users: UserInfo[];
  private readonly defaultError: ServiceError = { code: 'unknown', message: 'errorMessage', name: 'errorName', stack: 'errorStack' };

  constructor() {
    super();

    this.users = [
      new UserInfo(
        'complete@email.com',
        'User',
        'Complete',
        'User Description',
        '999 66 66 66',
        '',
        '1',
        'COMP00pndUbBW8W7Xgc51lWNAqC3',
        {
          native: LanguageService.getLanguageByKey(LanguageKeys.Spanish),
          write: LanguageService.getLanguageByKey(LanguageKeys.English)
        }
      )
    ];
  }

  public get(id: string): Observable<UserInfo | undefined> {
    const promise = new Promise<UserInfo | undefined>((resolve, reject) => {
      setTimeout(resolve, 3000);
      if (id.includes('error')) {
        return reject(this.defaultError);
      }

      const user: UserInfo | undefined = this.users.find(u => u.uid === id);
      return resolve(user);
    });
    return from(promise);
  }

  public set(user: UserInfo): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(resolve, 3000);
      if (user.description.includes('error')) {
        return reject(this.defaultError);
      }

      this.users.push(user);
      return resolve();
    });

    return promise;
  }
}
