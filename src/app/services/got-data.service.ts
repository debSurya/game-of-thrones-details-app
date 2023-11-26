import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHouse } from '../components/views/houses/houses.interface';
import { Observable } from 'rxjs';
import { IPerson } from '../components/views/persons/persons.interface';
import { IQuote } from '../components/views/quotes/quotes.interface';

@Injectable({
  providedIn: 'root',
})
export class GotDataService {
  private readonly housesApiUrl =
    'https://api.gameofthronesquotes.xyz/v1/houses';
  private readonly personsApiUrl =
    'https://api.gameofthronesquotes.xyz/v1/characters';
  private readonly quotesApiUrl =
    'https://api.gameofthronesquotes.xyz/v1/random/';

  constructor(private http: HttpClient) {}

  getGOTHouseData(): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(this.housesApiUrl);
  }

  getGOTPersonData(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.personsApiUrl);
  }

  getGOTQuotesData(count: number): Observable<IQuote[]> {
    return this.http.get<IQuote[]>(`${this.quotesApiUrl}${count}`);
  }
}
