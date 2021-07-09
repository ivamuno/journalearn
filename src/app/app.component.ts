import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  isAuthenticated = false;
  title = 'journal-me';

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

  openModal() {
    this.authService.openModal();
  }

  logout() {
    this.authService.logout();
  }
}
