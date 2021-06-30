import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JournalsListComponent } from './writer/journals-list/journals-list.component';
import { NewJournalComponent } from './writer/new-journal/new-journal.component';
import { HomeComponent } from './general/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JournalStoreService } from 'src/services/journal-store.service';
import { ViewJournalComponent } from './general/view-journal/view-journal.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalsListComponent,
    NewJournalComponent,
    HomeComponent,
    ViewJournalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [JournalStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
