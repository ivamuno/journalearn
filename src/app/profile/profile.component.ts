import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageNames } from '../shared/services';
import { ServiceError } from '../shared/services/service-error.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
@Injectable()
export class ProfileComponent implements OnInit {
  isSaving: boolean;
  isSaved: boolean;
  languages: string[] = Object.keys(LanguageNames);
  initials: string;
  error: ServiceError = new ServiceError();

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    description: new FormControl(null),
    nativeLanguage: new FormControl(null),
    writeLanguage: new FormControl(null),
  });

  ngOnInit(): void {
    this.isSaved = false;
    this.profileForm.valueChanges.subscribe(val => {
      this.initials = `${this.getInitial(val.firstName)}${this.getInitial(val.lastName)}`;;
    });
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.profileForm.disable();

    // DO something
    console.log('profileForm', this.profileForm.controls);

    this.isSaving = false;
  }

  cancel(): void {
    this.profileForm.reset();
  }

  private getInitial(name: string): string {
    if (name && name.length > 0) {
      return name[0].toUpperCase();
    }

    return '';
  }
}
