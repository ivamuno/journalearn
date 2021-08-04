import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  error: ServiceError = new ServiceError();

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    description: new FormControl(null)
  });

  ngOnInit(): void {
    this.isSaved = false;
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
}
