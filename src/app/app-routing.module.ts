import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './general/home.component';
import { JournalsListComponent } from './writer/journals-list/journals-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'journals', component: JournalsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
