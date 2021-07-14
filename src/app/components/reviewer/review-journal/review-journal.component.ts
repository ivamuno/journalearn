import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { JournalStoreService } from 'src/app/shared/services';
import { Journal, JournalStatus, Languages } from 'src/model/journal';

@Component({
  selector: 'app-review-journal',
  templateUrl: './review-journal.component.html',
  styleUrls: ['./review-journal.component.css'],
})
@Injectable()
export class ReviewJournalComponent implements OnInit {
  isLoading: boolean;
  isSaving: boolean;
  isSaved: boolean;
  reviewForm: FormGroup = new FormGroup({
    text: new FormControl(null),
  });
  journal: Journal;

  constructor(
    private journalStoreService: JournalStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.journal = new Journal();
    this.journal.language = { name: Languages.English, path: '' };

    const id = this.route.snapshot.params.id;
    this.journalStoreService.get(id).pipe(first()).subscribe((result) => {
      this.journal = result;
      this.reviewForm = new FormGroup({
        text: new FormControl(this.journal.text),
      });
      this.isLoading = false;
    });
  }

  async submit(): Promise<void> {
    this.isSaving = true;
    this.reviewForm.disable();
    const journal: Journal = {
      id: this.journal.id,
      author: this.journal.author,
      language: {
        name: this.journal.language.name,
        path: this.journal.language.path,
      },
      date: new Date(Date.now()),
      status: JournalStatus.Reviewed,
      title: this.journal.title,
      text: this.journal.title,
      review: this.reviewForm.value.text,
    };

    await this.journalStoreService.review(journal);
    this.isSaving = false;
    this.isSaved = true;
  }

  cancel(): void {
    this.reviewForm.reset({ text: this.journal.text });
  }
}
