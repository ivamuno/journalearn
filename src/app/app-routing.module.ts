import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  JournalsListComponent,
  NewJournalComponent,
  ReviewJournalComponent,
  ReviewListComponent,
  ViewJournalComponent,
} from './components';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewJournalComponent, canActivate: [AuthGuard] },
  {
    path: 'view/:id',
    component: ViewJournalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'review/:id',
    component: ReviewJournalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'journals',
    component: JournalsListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reviews', component: ReviewListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
