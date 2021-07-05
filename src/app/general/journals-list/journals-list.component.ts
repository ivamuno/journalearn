import { Component, Injectable, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Journal } from 'src/model/journal';
import { JournalStoreService } from 'src/services/journal-store.service';

@Component({
  selector: 'app-journals-list',
  templateUrl: './journals-list.component.html',
  styleUrls: ['./journals-list.component.css'],
})
@Injectable()
export class JournalsListComponent implements OnInit {
  journals: Journal[] = [];

  constructor(private journalStoreService: JournalStoreService) {}

  async ngOnInit() {
    from(this.journalStoreService.getAll()).subscribe(result => {
      this.journals = result;
    });
  }
}
