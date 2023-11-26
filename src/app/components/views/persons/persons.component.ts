import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgFor } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';

import { GotDataService } from 'src/app/services/got-data.service';
import { IPerson } from './persons.interface';
import { IQuote } from '../quotes/quotes.interface';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
    NgFor,
  ],
})
export class PersonsComponent {
  control = new FormControl();
  persons: IPerson[] = [];
  personDetails: IPerson | null = null;
  serviceSub: Subscription | null = null;
  formControlSub: Subscription | null = null;

  constructor(private getGOTDataService: GotDataService) {}

  ngOnInit() {
    this.serviceSub = this.getGOTDataService
      .getGOTPersonData()
      .subscribe((data: IPerson[]) => {
        console.log(data);
        this.persons = data;
      });
    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedPerson: IPerson | null) => {
        console.log(selectedPerson);
        this.personDetails = selectedPerson;
      }
    );
  }

  mutateSelectionForDisplay(person: IPerson) {
    return person?.name;
  }

  replaceQuotes() {
    this.getGOTDataService
      .getGOTQuotesData(Math.ceil(Math.random() * 5))
      .subscribe((data: IQuote[]) => {
        if (this.personDetails) {
          this.personDetails.quotes = data.map(
            (quote: IQuote) => quote.sentence
          );
        }
      });
  }

  ngOnDestroy() {
    this.formControlSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
  }
}
