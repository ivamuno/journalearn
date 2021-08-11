import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { LanguageNames, UserInfo, ServiceError, LanguageService, ProfileStoreService } from '../shared/services';
import * as fromApp from '../store/app.reducer';
import * as ProfileActions from './store/profile.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
@Injectable()
export class ProfileComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  isSaved: boolean;
  languages: string[] = Object.values(LanguageNames);
  initials: string;
  error: ServiceError = new ServiceError();

  profile: UserInfo;
  profileForm: FormGroup;

  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly profileStoreService: ProfileStoreService
  ) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      description: new FormControl(null),
      nativeLanguage: new FormControl(null),
      writeLanguage: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isSaved = false;
    this.profileForm.valueChanges.subscribe(val => {
      this.initials = UserInfo.getInitials(val.firstName, val.lastName);
    });

    this.store.select('profileState').pipe(first()).toPromise().then(({ profile }) => {
      if (profile) {
        this.profile = profile;
        const controls = this.profileForm.controls;
        controls.firstName.setValue(profile?.firstName);
        controls.lastName.setValue(profile?.lastName);
        controls.description.setValue(profile?.description);
        controls.nativeLanguage.setValue(profile?.language?.native?.name);
        controls.writeLanguage.setValue(profile?.language?.write?.name);
      }

      this.isLoading = false;
    });

    this.store.select('profileState').subscribe()
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.profileForm.disable();

    const controls = this.profileForm.controls;
    this.profile = {
      ...this.profile,
      firstName: controls.firstName.value,
      lastName: controls.lastName.value,
      description: controls.description.value,
      language: {
        native: LanguageService.getLanguageByName(controls.nativeLanguage.value),
        write: LanguageService.getLanguageByName(controls.writeLanguage.value)
      }
    };

    try {
      await this.profileStoreService.set(this.profile);
      this.store.dispatch(new ProfileActions.ProfileUpdate({ profile: this.profile }));
    } catch (error) {
      this.error = error;
    }

    this.isSaving = false;
    this.profileForm.enable();
  }

  cancel(): void {
    this.profileForm.reset();
  }
}
