import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Journal, JournalStatus, Languages } from 'src/model/journal';
import { JournalStoreService } from 'src/services/journal-service';

import { v4 as uuidv4 } from 'uuid';

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

  createForm: FormGroup = new FormGroup({
    author: new FormControl(null),
    language: new FormControl(null),
    title: new FormControl(null),
    text: new FormControl(null),
  });

  constructor(private journalStoreService: JournalStoreService) {}

  ngOnInit(): void {}

  async submit(): Promise<void> {
    this.isSaving = true;
    this.createForm.disable();
    const newJournal: Journal = {
      id: uuidv4(),
      author: this.createForm.value.author,
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
    await this.journalStoreService.add(newJournal);
    this.isSaving = false;
    this.isSaved = true;
  }

  cancel(): void {
    this.createForm.reset();
  }
}
