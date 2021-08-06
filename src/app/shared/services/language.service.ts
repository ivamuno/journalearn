import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

export enum LanguageKeys {
  Spanish = 'es',
  English = 'en',
}

export enum LanguageNames {
  Spanish = 'Español',
  English = 'English',
}

export class Language {
  public key: LanguageKeys;
  public name: string;
  public path: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private static readonly languages: Language[] = [
    { key: LanguageKeys.English, name: LanguageNames.English, path: 'assets/GBR.png' },
    { key: LanguageKeys.Spanish, name: LanguageNames.Spanish, path: 'assets/ESP.png' },
  ];

  public static DefaultLanguage = LanguageKeys.English;

  public isChoosingEvent = new EventEmitter<boolean>();
  public isChangedEvent = new Subject<string>();

  constructor(private readonly translateService: TranslateService) { }

  public open(): void {
    this.isChoosingEvent.emit(true);
  }

  public cancel(): void {
    this.isChoosingEvent.emit(false);
  }

  public set(language: string): void {
    if (!Object.values(LanguageKeys).filter(l => l === language)) {
      language = LanguageService.DefaultLanguage;
    }

    this.translateService.use(language);
    this.isChangedEvent.next(language);
    this.isChoosingEvent.emit(false);
  }

  public static getLanguageByKey(key: LanguageKeys | undefined): Language | undefined {
    return LanguageService.languages.find((l) => l.key === key);
  }

  public static getLanguageByName(name: LanguageNames): Language | undefined {
    return LanguageService.languages.find((l) => l.name === name);
  }
}
