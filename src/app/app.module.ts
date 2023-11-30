import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationsComponent } from 'src/app/components/navigations/navigations.component';
import { HousesComponent } from './components/views/houses/houses.component';
import { PersonsComponent } from './components/views/persons/persons.component';
import { QuotesComponent } from './components/views/quotes/quotes.component';
import { HomepageComponent } from './components/views/homepage/homepage.component';
import { MembersComponent } from './components/views/houses/members/members.component';
import { PersonQuotesComponent } from './components/views/persons/person-quotes/person-quotes.component';
import { LoaderInterceptor } from './services/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationsComponent,
    QuotesComponent,
    HomepageComponent,
    MembersComponent,
    HousesComponent,
    PersonsComponent,
    PersonQuotesComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
