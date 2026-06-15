import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/interfaces/auth.service';
import { AuthMockService } from './shared/services/mocks/auth-mock.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useClass: AuthMockService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title 'journal-me'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('journal-me');
  });

  it('should start unauthenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isAuthenticated).toBeFalse();
  });

  it('should update isAuthenticated when auth event fires', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const authService = TestBed.inject(AuthService);

    authService.isAuthenticatedEvent.next(true);
    expect(app.isAuthenticated).toBeTrue();

    authService.isAuthenticatedEvent.next(false);
    expect(app.isAuthenticated).toBeFalse();
  });

  it('should toggle isNavBurgerActive', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isNavBurgerActive).toBeFalse();

    app.isNavBurgerActive = true;
    app.closeNavBurger();
    expect(app.isNavBurgerActive).toBeFalse();
  });
});
