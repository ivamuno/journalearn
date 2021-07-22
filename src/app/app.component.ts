import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/interfaces/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  isAuthenticated = false;
  isNavBurgerActive = false;
  title = 'journal-me';

  constructor(private readonly authService: AuthService) {
    this.authService.isAuthenticatedEvent.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

  openModal(): void {
    this.authService.start();
  }

  logout(): void {
    this.authService.logout();
  }
}
