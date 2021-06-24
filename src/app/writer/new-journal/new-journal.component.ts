import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-journal',
  templateUrl: './new-journal.component.html',
  styleUrls: ['./new-journal.component.css'],
})
export class NewJournalComponent implements OnInit {
  @Input() isActive = false;
  @Output() isActiveChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  save(): void {
    this.isActiveChange.emit(false);
  }

  cancel(): void {
    this.isActiveChange.emit(false);
  }
}
