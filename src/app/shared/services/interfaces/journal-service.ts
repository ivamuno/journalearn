import { Observable } from 'rxjs';
import { Journal } from 'src/app/shared/services/interfaces/journal';

export abstract class JournalStoreService {
  public abstract getByUser(userId: string): Observable<Journal[]>;

  public abstract getPending(): Observable<Journal[]>;

  public abstract add(journal: Journal): Promise<void>;

  public abstract review(journal: Journal): Promise<void>;

  public abstract get(id: string): Observable<Journal>;
}
