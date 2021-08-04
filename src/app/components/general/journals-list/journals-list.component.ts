import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Journal } from 'src/app/shared/services/interfaces/journal';
import { JournalStoreService } from 'src/app/shared/services/interfaces/journal-service';
import { ServiceError } from '../../../shared/services/service-error.model';
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
  error: ServiceError;

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.error = new ServiceError();

    this.store.select('profileState').subscribe(({ profile }) => {
      this.journalStoreService.getByUser(profile?.uid || '').subscribe(
        (result: Journal[]) => {
          this.journals = result;
          this.isLoading = false;
        },
        (err: ServiceError) => {
          this.error = err;
        }
      );
    });
  }
}
