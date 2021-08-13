import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { Journal, JournalStoreService } from '../../../shared/services';
import { ToastService } from '../../../shared/services/firestore/toast.service';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-journals-list',
  templateUrl: './journals-list.component.html',
  styleUrls: ['./journals-list.component.css'],
})
@Injectable()
export class JournalsListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly store: Store<fromApp.AppState>,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.store.select('profileState').pipe(first()).toPromise()
      .then(({ profile }) => {
        this.journalStoreService.getByUser(profile?.uid || '').pipe().toPromise()
          .then(
            (result: Journal[]) => {
              this.journals = result;
              this.isLoading = false;
            },
            () => {
              this.toastService.addError('MY_LIST.MESSAGES.ERROR');
              this.isLoading = false;
            }
          );
      });
  }
}
