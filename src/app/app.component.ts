import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService, LanguageService, UserInfo } from './shared/services';
import * as fromApp from './store/app.reducer';

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
  initials: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<fromApp.AppState>,
    private readonly languageService: LanguageService
  ) {
    authService.init();
    this.store.select('profileState').subscribe(({ profile }) => {
      this.isAuthenticated = !!profile;
      if (profile) {
        this.initials = UserInfo.getInitials(profile.firstName, profile.lastName);
      } else {
        this.initials = '';
      }
    });
  }

  ngOnInit(): void {
    this.languageService.set(navigator.language);
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
