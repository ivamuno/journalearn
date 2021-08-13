import { Component, Injectable, OnInit } from '@angular/core';

import { JournalStoreService, Journal } from '../../../shared/services';
import { ToastService } from '../../../shared/services/firestore/toast.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
@Injectable()
export class ReviewListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly toastService: ToastService
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
          this.toastService.addError('REVIEW_LIST.MESSAGES.ERROR');
          this.isLoading = false;
        }
      );
  }
}
