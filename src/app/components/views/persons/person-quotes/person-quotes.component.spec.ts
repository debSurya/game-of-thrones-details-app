import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonQuotesComponent } from './person-quotes.component';

describe('PersonQuotesComponent', () => {
  let component: PersonQuotesComponent;
  let fixture: ComponentFixture<PersonQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonQuotesComponent]
    });
    fixture = TestBed.createComponent(PersonQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
