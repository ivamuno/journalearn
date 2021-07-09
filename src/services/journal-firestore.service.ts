import { Journal, JournalStatus, Languages } from 'src/model/journal';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JournalStoreService } from './journal-service';
import { AuthService } from './auth.service';

class JournalDb {
  public author: string;
  public language: Languages;
  public date: string;
  public title: string;
  public status: JournalStatus;
  public text: string;
  public review: string;
}

const journalCollectionKey = 'journals';

@Injectable()
export class JournalFirestoreService extends JournalStoreService {
  constructor(private firestore: AngularFirestore) {
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
        })
      );
  }

  public async add(journal: Journal): Promise<void> {
    try {
      const journalDb = this.convertFrom(journal);
      await this.firestore.collection(journalCollectionKey).add(journalDb);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  public async review(journal: Journal): Promise<void> {
    await this.firestore
      .collection(journalCollectionKey)
      .doc(journal.id)
      .update({
        review: journal.review,
        status: journal.status,
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
      id: id,
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
}
