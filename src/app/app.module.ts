import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalsListComponent } from './general/journals-list/journals-list.component';
import { NewJournalComponent } from './writer/new-journal/new-journal.component';
import { HomeComponent } from './general/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewJournalComponent } from './general/view-journal/view-journal.component';
import { ReviewJournalComponent } from './reviewer/review-journal/review-journal.component';
import { AuthComponent } from './general/auth/auth.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthService } from 'src/services/auth.service';
import { JournalFirestoreService } from 'src/services/journal-firestore.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { JournalStoreService } from 'src/services/journal-service';
import { ReviewListComponent } from './reviewer/review-list/review-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalsListComponent,
    NewJournalComponent,
    HomeComponent,
    ViewJournalComponent,
    ReviewJournalComponent,
    AuthComponent,
    ReviewListComponent
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
