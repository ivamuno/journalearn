import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { JournalStoreService, Journal, ServiceError } from '../../../shared/services';
import { ToastService } from '../../../shared/services/firestore/toast.service';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.css'],
})
@Injectable()
export class ViewJournalComponent implements OnInit {
  isLoading: boolean;
  activeDataTab = 2;
  journal: Journal = new Journal();
  error: ServiceError;

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    const id = this.route.snapshot.params.id;
    this.journalStoreService.get(id).pipe(first()).toPromise()
      .then(
        (result: Journal) => {
          this.journal = result;
          this.isLoading = false;
        },
        (err: ServiceError) => {
          if (['not-found', 'permission-denied'].includes(err.code)) {
            this.error = err;
          } else {
            this.toastService.addError('VIEW.MESSAGES.ERROR');
          }

          this.isLoading = false;
        }
      );
  }
}
