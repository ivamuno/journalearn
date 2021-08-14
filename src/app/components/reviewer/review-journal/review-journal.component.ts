import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { i18nKeys } from 'src/app/shared/i18n.keys';
import { ErrorService } from 'src/app/shared/services/error.service';

import { JournalStoreService, Journal, JournalStatus, ServiceError } from '../../../shared/services';

@Component({
  selector: 'app-review-journal',
  templateUrl: './review-journal.component.html',
  styleUrls: ['./review-journal.component.css'],
})
@Injectable()
export class ReviewJournalComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  isSaved: boolean;
  reviewForm: FormGroup = new FormGroup({
    text: new FormControl(null),
  });
  journal: Journal = new Journal();
  error: ServiceError;
  i18nKeys = i18nKeys;

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly route: ActivatedRoute,
    private readonly errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.journal = new Journal();

    const id = this.route.snapshot.params.id;
    this.journalStoreService
      .get(id)
      .pipe(first())
      .toPromise()
      .then(
        (result: Journal) => {
          this.journal = result;
          this.reviewForm = new FormGroup({
            text: new FormControl(this.journal.text),
          });
          this.isLoading = false;
        },
        (err: ServiceError) => {
          if (err.isAccessDenied()) {
            this.error = err;
          } else {
            this.errorService.addErrorNotification(i18nKeys.REVIEW.MESSAGES.ERROR_LOADING);
          }
        }
      );
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.reviewForm.disable();
    const journal: Journal = {
      id: this.journal.id,
      author: this.journal.author,
      language: {
        name: this.journal.language.name,
        path: this.journal.language.path,
      },
      date: new Date(Date.now()),
      status: JournalStatus.Reviewed,
      title: this.journal.title,
      text: this.journal.title,
      review: this.reviewForm.value.text,
    };

    try {
      await this.journalStoreService.review(journal);
      this.isSaved = true;
      this.errorService.addSuccessNotification(i18nKeys.REVIEW.MESSAGES.SUCCESS);
    } catch {
      this.errorService.addErrorNotification(i18nKeys.REVIEW.MESSAGES.ERROR_SAVING);
    }

    this.isSaving = false;
  }

  cancel(): void {
    this.reviewForm.reset({ text: this.journal.text });
  }
}
