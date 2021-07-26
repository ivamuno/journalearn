import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/interfaces/auth.service';

import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent implements OnInit {
  isAuthenticated = false;
  isNavBurgerActive = false;
  title = 'journal-me';

  constructor(private readonly authService: AuthService, private readonly languageService: LanguageService) {
    this.authService.isAuthenticatedEvent.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

  ngOnInit(): void {
    this.languageService.set(LanguageService.DefaultLanguage);
  }

  openAuthModal(): void {
    this.closeNavBurger();
    this.authService.start();
  }

  openLanguageModal(): void {
    this.closeNavBurger();
    this.languageService.open();
  }

  logout(): void {
    this.closeNavBurger();
    this.authService.logout();
  }

  closeNavBurger(): void {
    this.isNavBurgerActive = false;
  }
}
