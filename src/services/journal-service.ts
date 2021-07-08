import { Journal, Languages } from 'src/model/journal';
import { Observable } from 'rxjs';

export abstract class JournalStoreService {
  languagePaths: Record<Languages, string> = {
    Spanish: 'assets/ESP.png',
    English: 'assets/GBR.png',
  };

  public abstract getAll(): Observable<Journal[]>;

  public abstract add(journal: Journal): Promise<void>;

  public abstract review(journal: Journal): Promise<void>;

  public abstract get(id: string): Observable<Journal>;
}
