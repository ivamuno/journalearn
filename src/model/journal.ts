export enum Languages {
  Spanish = 'Spanish',
  English = 'English',
}

export enum JournalStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
}

export class Journal {
  public id: string;
  public author: string;
  public language: {
    name: Languages;
    path: string;
  };
  public date: Date;
  public title: string;
  public status: JournalStatus;
  public text: string;
  public review: string;
}
