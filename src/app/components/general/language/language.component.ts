import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
@Injectable()
export class LanguageComponent implements OnInit, OnDestroy {
  isOpened = false;
  language: string;

  constructor(private readonly languageService: LanguageService) {
    languageService.isChoosingEvent.subscribe((open) => {
      this.isOpened = open;
    });

    languageService.isChangedEvent.subscribe((language) => {
      this.language = language;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.close();
  }

  choose(language: string): void {
    this.languageService.set(language);
  }

  close(): void {
    this.languageService.cancel();
  }
}
