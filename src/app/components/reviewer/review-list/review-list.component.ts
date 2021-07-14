import { Component, Injectable, OnInit } from '@angular/core';
import { JournalStoreService } from 'src/app/shared/services';
import { Journal } from 'src/model/journal';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
@Injectable()
export class ReviewListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];

  constructor(private readonly journalStoreService: JournalStoreService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.journalStoreService.getPending().subscribe((result) => {
      this.journals = result;
      this.isLoading = false;
    });
  }
}
