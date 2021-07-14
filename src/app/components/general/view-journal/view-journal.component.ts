import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JournalStoreService } from 'src/app/shared/services';
import { Journal } from 'src/model/journal';

@Component({
  selector: 'app-view-journal',
  templateUrl: './view-journal.component.html',
  styleUrls: ['./view-journal.component.css'],
})
@Injectable()
export class ViewJournalComponent implements OnInit {
  activeDataTab = 2;
  journal: Journal;

  constructor(
    private journalStoreService: JournalStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.journalStoreService.get(id).subscribe((result) => {
      this.journal = result;
    });
  }
}
