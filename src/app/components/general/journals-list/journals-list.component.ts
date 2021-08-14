import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { i18nKeys } from 'src/app/shared/i18n.keys';
import { ErrorService } from 'src/app/shared/services/error.service';

import { Journal, JournalStoreService } from '../../../shared/services';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-journals-list',
  templateUrl: './journals-list.component.html',
  styleUrls: ['./journals-list.component.css'],
})
@Injectable()
export class JournalsListComponent implements OnInit {
  i18nKeys = i18nKeys;
  
  isLoading: boolean;
  journals: Journal[] = [];

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly store: Store<fromApp.AppState>,
    private readonly errorService: ErrorService
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
              this.errorService.addErrorNotification(i18nKeys.MY_LIST.MESSAGES.ERROR);
              this.isLoading = false;
            }
          );
      });
  }
}
