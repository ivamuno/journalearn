import { Component, Injectable, OnInit } from '@angular/core';
import { i18nKeys } from 'src/app/shared/i18n.keys';
import { ErrorService } from 'src/app/shared/services/error.service';

import { JournalStoreService, Journal } from '../../../shared/services';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
@Injectable()
export class ReviewListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];
  i18nKeys = i18nKeys;

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.journalStoreService.getPending().pipe().toPromise()
      .then(
        (result: Journal[]) => {
          this.journals = result;
          this.isLoading = false;
        },
        () => {
          this.errorService.addErrorNotification(i18nKeys.REVIEW_LIST.MESSAGES.ERROR);
          this.isLoading = false;
        }
      );
  }
}
