import { Component, Injectable, OnInit } from '@angular/core';
import { JournalStoreService } from 'src/app/shared/services';
import { Journal } from 'src/app/shared/services/interfaces/journal';
import { ServiceError } from '../../../shared/services/service-error.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
@Injectable()
export class ReviewListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];
  error: ServiceError;

  constructor(private readonly journalStoreService: JournalStoreService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = new ServiceError();

    this.journalStoreService.getPending().subscribe(
      (result: Journal[]) => {
        this.journals = result;
        this.isLoading = false;
      },
      (err: ServiceError) => {
        this.error = err;
      }
    );
  }
}
