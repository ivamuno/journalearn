import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import * as fromApp from './store/app.reducer';
import { ProfileEffects } from './profile/store/profile.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AuthComponent,
  ErrorComponent,
  HomeComponent,
  JournalsListComponent,
  NewJournalComponent,
  ReviewJournalComponent,
  ReviewListComponent,
  ViewJournalComponent,
} from './components';
import { LanguageComponent } from './components/general/language/language.component';
import * as services from './shared/services';
import { ProfileComponent } from './profile/profile.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    JournalsListComponent,
    NewJournalComponent,
    HomeComponent,
    ViewJournalComponent,
    ReviewJournalComponent,
    AuthComponent,
    ReviewListComponent,
    ErrorComponent,
    LanguageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ProfileEffects])
  ],
  providers: [
    { provide: services.AuthService, useClass: services.AuthMockService },
    { provide: services.JournalStoreService, useClass: services.JournalMockService },
    { provide: services.ProfileStoreService, useClass: services.ProfileFirestoreService },
    services.LanguageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
