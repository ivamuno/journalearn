import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { i18nKeys } from 'src/app/shared/i18n.keys';
import { ErrorService } from 'src/app/shared/services/error.service';

import { JournalStoreService, Journal, ServiceError } from '../../../shared/services';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.css'],
})
@Injectable()
export class ViewJournalComponent implements OnInit {
  i18nKeys = i18nKeys;
  isLoading: boolean;
  activeDataTab = 2;
  journal: Journal = new Journal();
  error: ServiceError | undefined;

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly route: ActivatedRoute,
    private readonly errorService: ErrorService
  ) {
    this.errorService.errorEvent.subscribe((e) => {
      this.error = e;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    const id = this.route.snapshot.params.id;
    this.journalStoreService
      .get(id)
      .pipe(first())
      .toPromise()
      .then(
        (result: Journal) => {
          this.journal = result;
          this.isLoading = false;
        },
        (err: ServiceError) => {
          if (err.isAccessDenied()) {
            this.errorService.setGlobalError(err);
          } else {
            this.errorService.addErrorNotification(i18nKeys.VIEW.MESSAGES.ERROR);
          }

          this.isLoading = false;
        }
      );
  }
}
