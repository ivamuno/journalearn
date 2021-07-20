import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JournalStoreService } from 'src/app/shared/services/journal-service';
import { Journal, JournalStatus, Languages } from 'src/model/journal';
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
  availableLanguages: string[] = Object.keys(Languages);
  author: string;

  createForm: FormGroup;

  constructor(
    private readonly journalStoreService: JournalStoreService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((u) => {
      this.author = u?.displayName || '';
    });
    this.createForm = new FormGroup({
      'language': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'text': new FormControl('', Validators.required),
    });
  }

  async submit(): Promise<void> {
    if(!this.createForm.valid){
      return
    }

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
    await this.journalStoreService.add(newJournal);
    this.isSaving = false;
    this.isSaved = true;
  }

  cancel(): void {
    this.createForm.reset();
  }
}
