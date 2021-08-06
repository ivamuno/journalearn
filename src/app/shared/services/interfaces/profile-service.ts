import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info.model';

export abstract class ProfileStoreService {
  public abstract get(id: string): Observable<UserInfo | undefined>;

  public abstract set(user: UserInfo): Promise<void>;
}
