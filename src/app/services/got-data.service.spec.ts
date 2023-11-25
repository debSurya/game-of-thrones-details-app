import { TestBed } from '@angular/core/testing';

import { GotDataService } from './got-data.service';

describe('GotDataService', () => {
  let service: GotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
