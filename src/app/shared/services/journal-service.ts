import { Observable } from 'rxjs';
import { Journal, Languages } from 'src/model/journal';

export abstract class JournalStoreService {
  languagePaths: Record<Languages, string> = {
    Spanish: 'assets/ESP.png',
    English: 'assets/GBR.png',
  };

  public abstract getByUser(userId: string): Observable<Journal[]>;

  public abstract getPending(): Observable<Journal[]>;

  public abstract add(journal: Journal): Promise<void>;

  public abstract review(journal: Journal): Promise<void>;

  public abstract get(id: string): Observable<Journal>;
}
