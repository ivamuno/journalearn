import { Component, OnInit } from '@angular/core';

enum Languages {
  Spanish = 'Spanish',
  English = 'English',
}

const languagePaths: Record<Languages, string> = {
  Spanish: 'assets/ESP.png',
  English: 'assets/GBR.png',
};

enum JournalStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
}

@Component({
  selector: 'app-journals-list',
  templateUrl: './journals-list.component.html',
  styleUrls: ['./journals-list.component.css'],
})
export class JournalsListComponent implements OnInit {
  isNewJournalActive = false;

  journals: {
    author: string;
    language: { name: Languages; path: string };
    date: Date;
    title: string;
    status: JournalStatus;
  }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.journals = [
      {
        author: 'Iván',
        date: new Date(2021, 6, 21),
        title: 'My first journal, long title',
        language: { name: Languages.Spanish, path: '' },
        status: JournalStatus.Pending,
      },
      {
        author: 'María',
        date: new Date(2021, 6, 22),
        title: 'My journal',
        language: { name: Languages.English, path: '' },
        status: JournalStatus.Reviewed,
      },
    ];

    this.journals.forEach(
      (l) => (l.language.path = languagePaths[l.language.name])
    );
  }

  createNewJournal(): void {
    this.isNewJournalActive = true;
  }
}
