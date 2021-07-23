import { Component, Inject, Injectable, LOCALE_ID, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/interfaces/auth.service';

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
    @Inject(LOCALE_ID) protected localeId: string,
    private readonly authService: AuthService
  ) {
    this.authService.isAuthenticatedEvent.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

  ngOnInit(): void {
    // Start rolling the ball ...    
    console.log("Current locale is " + this.localeId);
  }

  openModal(): void {
    this.authService.start();
  }

  logout(): void {
    this.authService.logout();
  }
}
