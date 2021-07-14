import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {
  AuthComponent,
  HomeComponent,
  JournalsListComponent,
  NewJournalComponent,
  ReviewJournalComponent,
  ReviewListComponent,
  ViewJournalComponent,
} from './components';
import { JournalStoreService } from './shared/services/journal-service';
import { JournalFirestoreService } from './shared/services/journal-firestore.service';

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
