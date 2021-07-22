import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JournalStoreService } from 'src/app/shared/services/journal-service';
import { Journal, JournalStatus, Languages } from 'src/model/journal';
import { v4 as uuidv4 } from 'uuid';
import { ServiceError } from '../../../shared/services/service-error.model';

@Component({
  selector: 'app-new-journal',
  templateUrl: './new-journal.component.html',
  styleUrls: ['./new-journal.component.css'],
})
@Injectable()
export class NewJournalComponent implements OnInit {
  isSaving: boolean;
  isSaved: boolean;
  languages: string[] = Object.keys(Languages);
  author: string;
  error: ServiceError = new ServiceError();

  createForm: FormGroup = new FormGroup({
    author: new FormControl(null),
    language: new FormControl(null),
    title: new FormControl(null),
    text: new FormControl(null),
  });

  constructor(private readonly journalStoreService: JournalStoreService, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isSaved = false;

    this.authService.user.subscribe((u) => {
      this.author = u?.uid || '';
    });
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.createForm.disable();
    const newJournal: Journal = {
      id: uuidv4(),
      author: this.author,
      language: {
        name: this.createForm.value.language,
        path: '',
      },
      date: new Date(Date.now()),
      status: JournalStatus.Pending,
      title: this.createForm.value.title,
      text: this.createForm.value.text,
      review: '',
    };

    this.journalStoreService
      .add(newJournal)
      .then(() => {
        this.isSaved = true;
      })
      .catch((err: ServiceError) => {
        this.error = err;
      });

    this.isSaving = false;
  }

  cancel(): void {
    this.createForm.reset();
  }
}
