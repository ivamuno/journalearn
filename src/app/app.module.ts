import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalsListComponent } from './general/journals-list/journals-list.component';
import { NewJournalComponent } from './writer/new-journal/new-journal.component';
import { HomeComponent } from './general/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JournalStoreService } from 'src/services/journal-store.service';
import { ViewJournalComponent } from './general/view-journal/view-journal.component';
import { ReviewJournalComponent } from './reviewer/review-journal/review-journal.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalsListComponent,
    NewJournalComponent,
    HomeComponent,
    ViewJournalComponent,
    ReviewJournalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [JournalStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
