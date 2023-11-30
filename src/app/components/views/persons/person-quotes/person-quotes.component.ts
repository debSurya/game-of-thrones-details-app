import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { GotDataService } from 'src/app/services/got-data.service';
import { IQuote } from '../../quotes/quotes.interface';
import { IPerson } from '../persons.interface';

@Component({
  selector: 'app-person-quotes',
  templateUrl: './person-quotes.component.html',
  styleUrls: ['./person-quotes.component.scss'],
})
export class PersonQuotesComponent implements OnChanges {
  personDetails: IPerson | null = null;
  @Input() selectedPerson: IPerson | null = null;

  constructor(
    private getGOTDataService: GotDataService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const selectedPerson = changes['selectedPerson'];
    if (selectedPerson.currentValue !== selectedPerson.previousValue) {
      this.personDetails = selectedPerson.currentValue;
    }
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
}
