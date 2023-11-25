import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHouse } from '../components/views/houses/houses.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GotDataService {
  private readonly apiUrl = 'https://api.gameofthronesquotes.xyz/v1/houses';

  constructor(private http: HttpClient) {}

  getGOTHouseData(): Observable<IHouse[]> {
    return this.http.get<IHouse[]>(this.apiUrl);
  }
}
