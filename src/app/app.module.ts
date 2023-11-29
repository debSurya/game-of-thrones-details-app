import { NgModule } from '@angular/core';
import { NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationsComponent } from 'src/app/components/navigations/navigations.component';
import { HousesComponent } from './components/views/houses/houses.component';
import { PersonsComponent } from './components/views/persons/persons.component';
import { QuotesComponent } from './components/views/quotes/quotes.component';
import { GotDataService } from './services/got-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './components/views/homepage/homepage.component';

@NgModule({
  declarations: [AppComponent, NavigationsComponent, QuotesComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HousesComponent,
    PersonsComponent,
    NgFor,
  ],
  providers: [GotDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
