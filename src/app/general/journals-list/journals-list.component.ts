import { Component, Injectable, OnInit } from '@angular/core';
import { Journal } from 'src/model/journal';
import { AuthService } from 'src/services/auth.service';
import { JournalStoreService } from 'src/services/journal-service';

@Component({
  selector: 'app-journals-list',
  templateUrl: './journals-list.component.html',
  styleUrls: ['./journals-list.component.css'],
})
@Injectable()
export class JournalsListComponent implements OnInit {
  isLoading: boolean;
  journals: Journal[] = [];

  constructor(
    private journalStoreService: JournalStoreService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    this.authService.user.subscribe((u) => {
      this.journalStoreService.getByUser(u.uid).subscribe((result) => {
        this.journals = result;
        this.isLoading = false;
      });
    });
  }
}
