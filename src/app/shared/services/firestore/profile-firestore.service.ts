import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserInfo, LanguageService, ProfileStoreService, ServiceError } from '..';
import { LanguageNames } from '../language.service';
import { FirestoreError } from './firestore-error';

class ProfileDb {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public description: string;
  public phoneNumber: string;
  public photoURL: string;
  public providerId: string;
  public language: {
    native?: string
    write?: string
  };
}

const profileCollectionKey = 'profiles';

@Injectable({
  providedIn: 'root',
})
export class ProfileFirestoreService extends ProfileStoreService {
  constructor(private readonly angularFirestore: AngularFirestore) {
    super();
  }

  public get(id: string): Observable<UserInfo | undefined> {
    console.log('ProfileFirestoreService.get.request', id);
    return this.angularFirestore
      .collection<ProfileDb>(profileCollectionKey)
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((x) => {
          console.log('ProfileFirestoreService.get.response', x.payload.data());
          return this.convertTo(x.payload.id, x.payload.data());
        }),
        catchError((error: FirestoreError) => {
          throw this.convertFirestoreError2ServiceError(error);
        })
      );
  }

  public async set(user: UserInfo): Promise<void> {
    const userDb = this.convertFrom(user);

    await this.angularFirestore
      .collection(profileCollectionKey)
      .doc(user.uid)
      .set(userDb)
      .catch((error: FirestoreError) => {
        throw this.convertFirestoreError2ServiceError(error);
      });
  }

  private convertFrom(userInfo: UserInfo): ProfileDb {
    return {
      id: userInfo.uid,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      description: userInfo.description,
      email: userInfo.email,
      language: {
        native: userInfo.language?.native?.name,
        write: userInfo.language?.write?.name,
      },
      phoneNumber: userInfo.phoneNumber,
      photoURL: userInfo.photoURL,
      providerId: userInfo.providerId
    };
  }

  private convertTo(id: string, profile: ProfileDb | undefined): UserInfo | undefined {
    if (!profile) {
      return undefined;
    }

    return new UserInfo(
      profile.email,
      profile.firstName,
      profile.lastName,
      profile.description,
      profile.phoneNumber,
      profile.photoURL,
      profile.providerId,
      id,
      {
        native: LanguageService.getLanguageByName(profile.language.native as LanguageNames),
        write: LanguageService.getLanguageByName(profile.language.write as LanguageNames)
      }
    );
  }

  private convertFirestoreError2ServiceError(error: FirestoreError): ServiceError {
    return {
      code: error.code,
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }
}
