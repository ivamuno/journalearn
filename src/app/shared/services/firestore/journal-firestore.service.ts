import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Journal, JournalStatus } from 'src/app/shared/services/models/journal.model';
import { JournalStoreService, LanguageNames, LanguageService } from '..';
import { FirestoreError } from './firestore-error';
import { FirestoreServiceHelper } from './firestore.service.helper';

class JournalDb {
  public author: string;
  public language: LanguageNames;
  public date: string;
  public title: string;
  public status: JournalStatus;
  public text: string;
  public review: string;
}

const journalCollectionKey = 'journals';

@Injectable({
  providedIn: 'root',
})
export class JournalFirestoreService extends JournalStoreService {
  constructor(private readonly firestore: AngularFirestore) {
    super();
  }

  public getByUser(userId: string): Observable<Journal[]> {
    return this.firestore
      .collection<JournalDb>(journalCollectionKey, (ref) => ref.where('author', '==', userId))
      .snapshotChanges()
      .pipe(
        map((x) => {
          return x.map((doc) => {
            return this.convertTo(doc.payload.doc.id, doc.payload.doc.data() as JournalDb);
          });
        }),
        catchError((error: FirestoreError) => {
          throw FirestoreServiceHelper.convertFirestoreError2ServiceError(error);
        })
      );
  }

  public getPending(): Observable<Journal[]> {
    return this.firestore
      .collection<JournalDb>(journalCollectionKey, (ref) => ref.where('status', '==', 'Pending'))
      .snapshotChanges()
      .pipe(
        map((x) => {
          return x.map((doc) => {
            return this.convertTo(doc.payload.doc.id, doc.payload.doc.data() as JournalDb);
          });
        }),
        catchError((error: FirestoreError) => {
          throw FirestoreServiceHelper.convertFirestoreError2ServiceError(error);
        })
      );
  }

  public async add(journal: Journal): Promise<void> {
    const journalDb = this.convertFrom(journal);
    await this.firestore
      .collection(journalCollectionKey)
      .add(journalDb)
      .catch((error: FirestoreError) => {
        throw FirestoreServiceHelper.convertFirestoreError2ServiceError(error);
      });
  }

  public async review(journal: Journal): Promise<void> {
    await this.firestore
      .collection(journalCollectionKey)
      .doc(journal.id)
      .update({
        review: journal.review,
        status: journal.status,
      })
      .catch((error: FirestoreError) => {
        throw FirestoreServiceHelper.convertFirestoreError2ServiceError(error);
      });
  }

  public get(id: string): Observable<Journal> {
    return this.firestore
      .collection<JournalDb>(journalCollectionKey)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((x) => {
          return this.convertTo(x.payload.id, x.payload.data() as JournalDb);
        }),
        catchError((error: FirestoreError) => {
          throw FirestoreServiceHelper.convertFirestoreError2ServiceError(error);
        })
      );
  }

  private convertFrom(journal: Journal): JournalDb {
    return {
      author: journal.author,
      date: journal.date.toUTCString(),
      title: journal.title,
      language: journal.language.name,
      status: journal.status,
      text: journal.text,
      review: journal.review,
    };
  }

  private convertTo(id: string, journal: JournalDb): Journal {
    return {
      id,
      author: journal.author,
      date: new Date(Date.parse(journal.date)),
      title: journal.title,
      language: {
        name: journal.language,
        path: LanguageService.getLanguageByName(journal.language)?.path || '',
      },
      status: journal.status,
      text: journal.text,
      review: journal.review,
    };
  }
}
