import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { GotDataService } from 'src/app/services/got-data.service';
import { IQuote } from './quotes.interface';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent {
  quotes: IQuote[] = [];
  serviceSub: Subscription | null = null;
  quotesCount = 5;

  constructor(private getGOTDataService: GotDataService) {}

  callforQuotesRetrieval() {
    this.serviceSub = this.getGOTDataService
      .getGOTQuotesData(this.quotesCount)
      .subscribe((data: IQuote[]) => {
        this.quotes = data;
      });
  }

  ngOnInit() {
    this.callforQuotesRetrieval();
  }

  ngOnDestroy() {
    this.serviceSub?.unsubscribe();
  }
}
