import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Journal, JournalStatus, Languages } from 'src/model/journal';

import { JournalStoreService } from './journal-service';
import { ServiceError } from './service-error.model';

class JournalDb {
  public author: string;
  public language: Languages;
  public date: string;
  public title: string;
  public status: JournalStatus;
  public text: string;
  public review: string;
}

class FirestoreError {
  public code: "cancelled"
    | "unknown"
    | "invalid-argument"
    | "deadline-exceeded"
    | "not-found"
    | "already-exists"
    | "permission-denied"
    | "resource-exhausted"
    | "failed-precondition"
    | "aborted"
    | "out-of-range"
    | "unimplemented"
    | "internal"
    | "unavailable"
    | "data-loss"
    | "unauthenticated";
  public message: string;
  public name: string;
  public stack: string;
}

const journalCollectionKey = 'journals';

@Injectable()
export class JournalFirestoreService extends JournalStoreService {
  constructor(private readonly firestore: AngularFirestore) {
    super();
  }

  public getByUser(userId: string): Observable<Journal[]> {
    return this.firestore
      .collection<JournalDb>(journalCollectionKey, (ref) =>
        ref.where('author', '==', userId)
      )
      .snapshotChanges()
      .pipe(
        map((x) => {
          return x.map((doc) => {
            return this.convertTo(
              doc.payload.doc.id,
              doc.payload.doc.data() as JournalDb
            );
          });
        }),
        catchError((error: FirestoreError) => {
          throw this.convertFirestoreError2ServiceError(error);
        })
      );
  }

  public getPending(): Observable<Journal[]> {
    return this.firestore
      .collection<JournalDb>(journalCollectionKey, (ref) =>
        ref.where('status', '==', 'Pending')
      )
      .snapshotChanges()
      .pipe(
        map((x) => {
          return x.map((doc) => {
            return this.convertTo(
              doc.payload.doc.id,
              doc.payload.doc.data() as JournalDb
            );
          });
        }),
        catchError((error: FirestoreError) => {
          throw this.convertFirestoreError2ServiceError(error);
        })
      );
  }

  public async add(journal: Journal): Promise<void> {
    const journalDb = this.convertFrom(journal);
    await this.firestore.collection(journalCollectionKey)
      .add(journalDb)
      .catch((error: FirestoreError) => {
        throw this.convertFirestoreError2ServiceError(error);
      });
  }

  public async review(journal: Journal): Promise<void> {
    await this.firestore.collection(journalCollectionKey).doc(journal.id)
      .update({
        review: journal.review,
        status: journal.status,
      })
      .catch((error: FirestoreError) => {
        throw this.convertFirestoreError2ServiceError(error);
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
          throw this.convertFirestoreError2ServiceError(error);
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
        path: this.languagePaths[journal.language],
      },
      status: journal.status,
      text: journal.text,
      review: journal.review,
    };
  }

  private convertFirestoreError2ServiceError(error: FirestoreError): ServiceError {
    return {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack
    };
  }
}
