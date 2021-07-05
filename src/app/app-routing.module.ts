import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './general/home.component';
import { ViewJournalComponent } from './general/view-journal/view-journal.component';
import { JournalsListComponent } from './general/journals-list/journals-list.component';
import { NewJournalComponent } from './writer/new-journal/new-journal.component';
import { ReviewJournalComponent } from './reviewer/review-journal/review-journal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewJournalComponent },
  { path: 'view/:id', component: ViewJournalComponent },
  { path: 'review/:id', component: ReviewJournalComponent },
  { path: 'journals', component: JournalsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
