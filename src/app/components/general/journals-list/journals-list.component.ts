import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/interfaces/auth.service';
import { Journal } from 'src/app/shared/services/interfaces/journal';
import { JournalStoreService } from 'src/app/shared/services/interfaces/journal-service';

import { ServiceError } from '../../../shared/services/service-error.model';

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

  constructor(private readonly journalStoreService: JournalStoreService, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = new ServiceError();

    this.authService.user.subscribe((u) => {
      this.journalStoreService.getByUser(u?.uid || '').subscribe(
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
