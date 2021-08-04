import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LanguageService } from './shared/services/language.service';
import * as fromApp from './store/app.reducer';
import { AuthService } from './shared/services';

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

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<fromApp.AppState>,
    private readonly languageService: LanguageService
  ) {
    authService.init();
    this.store.select('profileState').subscribe(({ profile }) => {
      this.isAuthenticated = !!profile;
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
