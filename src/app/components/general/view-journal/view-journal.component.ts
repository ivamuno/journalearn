import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JournalStoreService, Journal, ServiceError } from '../../../shared/services';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.css'],
})
@Injectable()
export class ViewJournalComponent implements OnInit {
  activeDataTab = 2;
  journal: Journal = new Journal();
  error: ServiceError;

  constructor(private readonly journalStoreService: JournalStoreService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.journalStoreService.get(id).subscribe(
      (result: Journal) => {
        this.journal = result;
      },
      (err: ServiceError) => {
        this.error = err;
      }
    );
  }
}
