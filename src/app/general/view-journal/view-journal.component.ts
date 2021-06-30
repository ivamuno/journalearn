import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journal } from 'src/model/journal';
import { JournalStoreService } from 'src/services/journal-store.service';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.css'],
})
@Injectable()
export class ViewJournalComponent implements OnInit {
  activeDataTab: number = 2;
  journal: Journal;

  constructor(
    private journalStoreService: JournalStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.journal = this.journalStoreService.get(id) || new Journal();
  }
}
