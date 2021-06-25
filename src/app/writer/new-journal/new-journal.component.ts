import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-journal',
  templateUrl: './new-journal.component.html',
  styleUrls: ['./new-journal.component.css'],
})
export class NewJournalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  save(): void {}

  cancel(): void {}
}
