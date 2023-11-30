import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HousesComponent } from './components/views/houses/houses.component';
import { PersonsComponent } from './components/views/persons/persons.component';
import { QuotesComponent } from './components/views/quotes/quotes.component';
import { HomepageComponent } from './components/views/homepage/homepage.component';

const routes: Routes = [
  {
    path: 'houses',
    component: HousesComponent,
  },
  {
    path: 'persons',
    component: PersonsComponent,
  },
  {
    path: 'quotes',
    component: QuotesComponent,
  },
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
