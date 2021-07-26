import { LanguageNames } from '../language.service';

export enum JournalStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
}

export class Journal {
  public id: string;
  public author: string;
  public language: {
    name: LanguageNames;
    path: string;
  };
  public date: Date;
  public title: string;
  public status: JournalStatus;
  public text: string;
  public review: string;

  constructor() {
    this.id = '';
    this.author = '';
    this.language = {
      name: LanguageNames.English,
      path: '',
    };
    this.date = new Date();
    this.title = '';
    this.status = JournalStatus.Pending;
    this.text = '';
    this.review = '';
  }
}
