import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/interfaces/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
@Injectable()
export class AuthComponent implements OnInit, OnDestroy {
  isOpened = false;

  constructor(private readonly authService: AuthService) {
    authService.isAuthenticatingEvent.subscribe((open) => {
      this.isOpened = open;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.close();
  }

  close(): void {
    this.authService.cancel();
  }
}
