import { Component, Injectable, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.journals = this.journalStoreService.getAll();
  }
}
