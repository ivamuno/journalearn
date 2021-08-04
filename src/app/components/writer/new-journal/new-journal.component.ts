import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';

import { Journal, JournalStatus } from 'src/app/shared/services/interfaces/journal';
import { JournalStoreService } from 'src/app/shared/services/interfaces/journal-service';
import { LanguageNames } from 'src/app/shared/services/language.service';

import { ServiceError } from '../../../shared/services/service-error.model';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-new-journal',
  templateUrl: './new-journal.component.html',
  styleUrls: ['./new-journal.component.css'],
})
@Injectable()
export class NewJournalComponent implements OnInit {
  isSaving: boolean;
  isSaved: boolean;
  languages: string[] = Object.keys(LanguageNames);
  author: string;
  error: ServiceError = new ServiceError();

  createForm: FormGroup = new FormGroup({
    author: new FormControl(null),
    language: new FormControl(null),
    title: new FormControl(null),
    text: new FormControl(null),
  });

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.isSaved = false;

    this.store.select('profileState').subscribe(({ profile }) => {
      this.author = profile?.uid || '';
    });
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.createForm.disable();
    const newJournal: Journal = {
      id: uuidv4(),
      author: this.author,
      language: {
        name: this.createForm.value.language,
        path: '',
      },
      date: new Date(Date.now()),
      status: JournalStatus.Pending,
      title: this.createForm.value.title,
      text: this.createForm.value.text,
      review: '',
    };

    this.journalStoreService
      .add(newJournal)
      .then(() => {
        this.isSaved = true;
      })
      .catch((err: ServiceError) => {
        this.error = err;
      });

    this.isSaving = false;
  }

  cancel(): void {
    this.createForm.reset();
  }
}
