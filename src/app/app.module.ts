import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AuthComponent,
  HomeComponent,
  JournalsListComponent,
  NewJournalComponent,
  ReviewJournalComponent,
  ReviewListComponent,
  ViewJournalComponent,
} from './components';
import { JournalFirestoreService } from './shared/services/journal-firestore.service';
import { JournalStoreService } from './shared/services/journal-service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    { provide: JournalStoreService, useClass: JournalFirestoreService },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
