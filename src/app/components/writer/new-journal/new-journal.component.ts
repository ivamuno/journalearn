import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { i18nKeys } from 'src/app/shared/i18n.keys';
import { ErrorService } from 'src/app/shared/services/error.service';
import { v4 as uuidv4 } from 'uuid';

import { Journal, JournalStatus, JournalStoreService, LanguageNames, ServiceError } from '../../../shared/services';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-new-journal',
  templateUrl: './new-journal.component.html',
  styleUrls: ['./new-journal.component.css'],
})
@Injectable()
export class NewJournalComponent implements OnInit {
  i18nKeys = i18nKeys;
  isSaving: boolean;
  isSaved: boolean;
  languages: string[] = Object.values(LanguageNames);
  error: ServiceError;

  createForm: FormGroup = new FormGroup({
    author: new FormControl(null),
    language: new FormControl(null),
    title: new FormControl(null),
    text: new FormControl(null),
  });

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly store: Store<fromApp.AppState>,
    private readonly errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.isSaved = false;
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.createForm.disable();

    try {
      const { profile } = await this.store.select('profileState').pipe(first()).toPromise();
      const newJournal: Journal = {
        id: uuidv4(),
        author: profile?.uid || '',
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
      await this.journalStoreService.add(newJournal);
      this.isSaved = true;
      this.errorService.addSuccessNotification(i18nKeys.NEW.MESSAGES.SUCCESS);
    } catch {
      this.errorService.addErrorNotification(i18nKeys.NEW.MESSAGES.ERROR);
    }

    this.isSaving = false;
  }

  cancel(): void {
    this.createForm.reset();
  }
}
