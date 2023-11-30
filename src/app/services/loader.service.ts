import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSub = new BehaviorSubject(false);

  setLoadingState(loading: boolean) {
    this.loadingSub.next(loading);
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingSub.asObservable();
  }
}
