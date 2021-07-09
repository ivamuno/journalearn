import { Component, Injectable, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Journal } from 'src/model/journal';
import { JournalStoreService } from 'src/services/journal-service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
@Injectable()
export class ReviewListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];

  constructor(private journalStoreService: JournalStoreService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.journalStoreService.getPending().subscribe((result) => {
      this.journals = result;
      this.isLoading = false;
    });
  }
}
