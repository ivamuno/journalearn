import { from, Observable } from 'rxjs';
import { Journal, JournalStatus, Languages } from 'src/model/journal';
import { JournalStoreService } from './journal-service';

export class JournalMockService extends JournalStoreService {
  private journals: Journal[] = [];

  constructor() {
    super();
    this.journals = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        author: 'Iván',
        date: new Date(2021, 6, 21),
        title: 'My first journal, long title',
        language: { name: Languages.Spanish, path: '' },
        status: JournalStatus.Pending,
        text: 'My first journal, long title Text',
        review: '',
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        author: 'María',
        date: new Date(2021, 6, 22),
        title: 'My journal',
        language: { name: Languages.English, path: '' },
        status: JournalStatus.Reviewed,
        text: 'My journal Text',
        review: 'My journal Text (reviwed)',
      },
    ];

    this.journals.forEach(
      (l) => (l.language.path = this.languagePaths[l.language.name])
    );
  }

  public getAll(): Observable<Journal[]> {
    const promise = new Promise<Journal[]>((resolve, reject) => {
      setTimeout(resolve, 3000);
      return resolve(this.journals);
    });
    return from(promise);
  }

  public async add(journal: Journal): Promise<void> {
    journal.language.path = this.languagePaths[journal.language.name];
    this.journals.push(journal);
    await this.timeout(3000);
  }

  public get(id: string): Observable<Journal> {
    const promise = new Promise<Journal>((resolve, reject) => {
      setTimeout(resolve, 3000);
      return resolve(this.journals.find((j) => j.id == id) || new Journal());
    });
    return from(promise);
  }

  public async review(journal: Journal): Promise<void> {
    this.journals
      .filter((j) => j.id == journal.id)
      .map((j) => {
        j.review = journal.review;
        j.status = journal.status;
      });
    await this.timeout(3000);
  }

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
