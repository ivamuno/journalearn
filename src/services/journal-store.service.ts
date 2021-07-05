import { Journal, JournalStatus, Languages } from 'src/model/journal';
import {
  addDoc,
  collection,
  DocumentData,
  FirebaseFirestore,
  getDocs,
  QuerySnapshot,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

class JournalDb {
  public author: string;
  public language: Languages;
  public date: string;
  public title: string;
  public status: JournalStatus;
  public text: string;
  public review: string;
}

const languagePaths: Record<Languages, string> = {
  Spanish: 'assets/ESP.png',
  English: 'assets/GBR.png',
};

const journalCollectionKey = 'journals';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAMpiHHTURYj-yrzrozfebeaeexzuy3EM8',
  authDomain: 'journa-l-earn.firebaseapp.com',
  databaseURL:
    'https://journa-l-earn-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'journa-l-earn',
  storageBucket: 'journa-l-earn.appspot.com',
  messagingSenderId: '1057574348493',
  appId: '1:1057574348493:web:f0b24c97aea21389246b84',
  measurementId: 'G-JP5N25V5RN',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export class JournalStoreService {
  private db: FirebaseFirestore;

  constructor() {
    this.db = getFirestore();
  }

  public async getAll(): Promise<Journal[]> {
    const journals: Journal[] = [];

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(this.db, journalCollectionKey)
    );
    querySnapshot.forEach((doc) => {
      const journal = this.convertTo(doc.id, doc.data() as JournalDb);
      journals.push(journal);
    });

    return journals;
  }

  public async add(journal: Journal): Promise<void> {
    const journalDb = this.convertFrom(journal);

    try {
      const docRef = await addDoc(
        collection(this.db, journalCollectionKey),
        journalDb
      );
      console.log('Document written with ID: ', docRef.id, journalDb);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  public async review(journal: Journal): Promise<void> {
    const docRef = doc(this.db, journalCollectionKey, journal.id);

    await updateDoc(docRef, {
      review: journal.review,
      status: journal.status,
    });
  }

  public async get(id: string): Promise<Journal> {
    const docRef = doc(this.db, journalCollectionKey, id);
    const docSnap = await getDoc(docRef);

    return this.convertTo(docSnap.id, docSnap.data() as JournalDb);
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
        path: languagePaths[journal.language],
      },
      status: journal.status,
      text: journal.text,
      review: journal.review,
    };
  }
}
