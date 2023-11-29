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
import { ActivatedRoute, Router } from '@angular/router';

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
  filteredPersons: IPerson[] = [];
  personDetails: IPerson | null = null;
  serviceSub: Subscription | null = null;
  formControlSub: Subscription | null = null;
  routeSub: Subscription | null = null;

  constructor(
    private getGOTDataService: GotDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceSub = this.getGOTDataService
      .getGOTPersonData()
      .subscribe((data: IPerson[]) => {
        console.log(data);
        this.persons = this.filteredPersons = data;
        this.routeSub = this.route.params.subscribe((params) => {
          this.personDetails =
            this.persons.find((person) => person.slug === params['person']) ??
            null;
          this.personDetails && this.control.setValue(this.personDetails);
        });
      });

    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedPerson: IPerson | string) => {
        if (typeof selectedPerson === 'string') {
          this.filteredPersons = this.persons.filter((person: IPerson) =>
            person.name.toLowerCase().includes(selectedPerson.toLowerCase())
          );
        } else if (selectedPerson?.slug) {
          this.router.navigate(['/persons', selectedPerson?.slug]);
        }
      }
    );
  }

  mutateSelectionForDisplay(person: IPerson) {
    return person?.name;
  }

  redirectToHouse(slug: string) {
    this.router.navigate(['/houses', slug]);
  }

  replaceQuotes() {
    this.getGOTDataService
      .getGOTQuotesData(Math.ceil(Math.random() * 10))
      .subscribe((data: IQuote | IQuote[]) => {
        if (this.personDetails) {
          console.log(data);
          this.personDetails.quotes = Array.isArray(data)
            ? data.map((quote: IQuote) => quote.sentence)
            : [data.sentence];
        }
      });
  }

  ngOnDestroy() {
    this.formControlSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}
