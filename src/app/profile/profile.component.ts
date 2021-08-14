import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { LanguageNames, UserInfo, LanguageService, ProfileStoreService } from '../shared/services';
import * as fromApp from '../store/app.reducer';
import * as ProfileActions from './store/profile.actions';
import { FormHelper } from '../shared/form.helper';
import { ErrorService } from '../shared/services/error.service';
import { i18nKeys } from '../shared/i18n.keys';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
@Injectable()
export class ProfileComponent implements OnInit {
  i18nKeys = i18nKeys;

  isLoading: boolean;
  isSaving: boolean;
  languages: string[] = Object.values(LanguageNames);
  initials: string;

  profile: UserInfo;
  profileForm: FormGroup;

  get firstName() {
    return this.profileForm.get('firstName')!;
  }
  get lastName() {
    return this.profileForm.get('lastName')!;
  }
  get description() {
    return this.profileForm.get('description')!;
  }
  get nativeLanguage() {
    return this.profileForm.get('nativeLanguage')!;
  }
  get writeLanguage() {
    return this.profileForm.get('writeLanguage')!;
  }

  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly profileStoreService: ProfileStoreService,
    private readonly errorService: ErrorService,
    readonly formHelper: FormHelper
  ) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      nativeLanguage: new FormControl(null, Validators.required),
      writeLanguage: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.profileForm.valueChanges.subscribe((val) => {
      this.initials = UserInfo.getInitials(val.firstName, val.lastName);
    });

    this.store
      .select('profileState')
      .pipe(first())
      .toPromise()
      .then(({ profile }) => {
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

    this.store.select('profileState').subscribe();
  }

  async submit(): Promise<void> {
    if (!this.profileForm.valid) {
      this.formHelper.validateAllFormFields(this.profileForm);
      return;
    }

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
        write: LanguageService.getLanguageByName(controls.writeLanguage.value),
      },
    };

    try {
      await this.profileStoreService.set(this.profile);
      this.store.dispatch(new ProfileActions.ProfileUpdate({ profile: this.profile }));
      this.errorService.addSuccessNotification(i18nKeys.PROFILE.MESSAGES.SUCCESS);
    } catch (error) {
      this.errorService.addErrorNotification(i18nKeys.PROFILE.MESSAGES.ERROR);
    }

    this.isSaving = false;
    this.profileForm.enable();
  }

  cancel(): void {
    this.profileForm.reset();
  }
}
