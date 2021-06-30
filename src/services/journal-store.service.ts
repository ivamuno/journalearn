import { Journal, JournalStatus, Languages } from 'src/model/journal';

const languagePaths: Record<Languages, string> = {
  Spanish: 'assets/ESP.png',
  English: 'assets/GBR.png',
};

export class JournalStoreService {
  private journals: Journal[] = [];

  constructor() {
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
      (l) => (l.language.path = languagePaths[l.language.name])
    );
  }

  public getAll(): Journal[] {
    return this.journals;
  }

  public async add(journal: Journal): Promise<void> {
    journal.language.path = languagePaths[journal.language.name];
    this.journals.push(journal);
    await this.timeout(3000);
  }

  public get(id: string): Journal | undefined {
    return this.journals.find((j) => j.id == id);
  }

  private timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
