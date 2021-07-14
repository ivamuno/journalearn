import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JournalStoreService } from 'src/app/shared/services/journal-service';
import { Journal } from 'src/model/journal';

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
    private readonly journalStoreService: JournalStoreService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.authService.user.subscribe((u) => {
      this.journalStoreService.getByUser(u?.uid || '').subscribe((result) => {
        this.journals = result;
        this.isLoading = false;
      });
    });
  }
}
