import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { LanguageNames, LanguageService, Journal, JournalStatus, JournalStoreService, ServiceError } from '..';
import { MockHelper } from './mock.helper';

@Injectable({
  providedIn: 'root',
})
export class JournalMockService extends JournalStoreService {
  private readonly journals: Journal[] = [];
  private readonly defaultError: ServiceError = { code: 'unknown', message: 'errorMessage', name: 'errorName', stack: 'errorStack' };
  private getByUserCounter = 0;
  private getPendingCounter = 0;

  constructor() {
    super();
    this.journals = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        author: 'Iván',
        date: new Date(2021, 6, 21),
        title: 'Pending Ok',
        language: { name: LanguageNames.Spanish, path: '' },
        status: JournalStatus.Pending,
        text: 'My first journal, long title Text',
        review: '',
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        author: 'María',
        date: new Date(2021, 6, 22),
        title: 'Reviewed Ok',
        language: { name: LanguageNames.English, path: '' },
        status: JournalStatus.Reviewed,
        text: 'My journal Text',
        review: 'My journal Text (reviewed)',
      },
      {
        id: '11111111-6666-6666-6666-111111111111',
        author: 'Iván',
        date: new Date(2021, 6, 21),
        title: 'Pending Error',
        language: { name: LanguageNames.Spanish, path: '' },
        status: JournalStatus.Pending,
        text: 'My first journal, long title Text Error',
        review: '',
      },
      {
        id: '22222222-6666-6666-6666-222222222222',
        author: 'María',
        date: new Date(2021, 6, 22),
        title: 'Reviewed Error',
        language: { name: LanguageNames.English, path: '' },
        status: JournalStatus.Reviewed,
        text: 'My journal Text Error',
        review: 'My journal Text (reviewed)',
      },
    ];

    this.journals.forEach((l) => (l.language.path = LanguageService.getLanguageByName(l.language.name)?.path || ''));
  }

  public getByUser(userId: string): Observable<Journal[]> {
    const promise = async () => {
      await MockHelper.delay();
      if (this.getByUserCounter++ % 2 === 0) {
        return this.journals;
      }

      throw this.defaultError;
    };

    return from(promise());
  }

  public getPending(): Observable<Journal[]> {
    const promise = async () => {
      await MockHelper.delay();
      if (this.getPendingCounter++ % 2 === 0) {
        return this.journals;
      }

      throw this.defaultError;
    };

    return from(promise());
  }

  public async add(journal: Journal): Promise<void> {
    await MockHelper.delay();
    if (journal.title.includes('Error')) {
      throw this.defaultError;
    }
  }

  public get(id: string): Observable<Journal> {
    const promise = async () => {
      await MockHelper.delay();
      const journal = this.journals.find((j) => j.id === id) || new Journal();
      if (journal.title.includes('Error')) {
        throw this.defaultError;
      }

      return journal;
    };

    return from(promise());
  }

  public async review(journal: Journal): Promise<void> {
    await MockHelper.delay();
    if (journal.review.includes('Error')) {
      throw this.defaultError;
    }

    this.journals
      .filter((j) => j.id === journal.id)
      .map((j) => {
        j.review = journal.review;
        j.status = journal.status;
      });
  }
}
