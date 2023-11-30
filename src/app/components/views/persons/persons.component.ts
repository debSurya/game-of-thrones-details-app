import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { GotDataService } from 'src/app/services/got-data.service';
import { IPerson } from './persons.interface';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonsComponent {
  control = new FormControl();
  persons: IPerson[] = [];
  filteredPersons: IPerson[] = [];
  selectedPerson: IPerson | null = null;
  serviceSub: Subscription | null = null;
  formControlSub: Subscription | null = null;

  constructor(private getGOTDataService: GotDataService) {}

  ngOnInit() {
    this.serviceSub = this.getGOTDataService
      .getGOTPersonData()
      .subscribe((data: IPerson[]) => {
        this.persons = this.filteredPersons = data;
        if (history.state?.person) {
          this.control.setValue(
            this.persons.find(
              (person: IPerson) => person.slug === history.state.person
            )
          );
        }
      });

    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedPerson: IPerson | string) => {
        if (typeof selectedPerson === 'string') {
          this.filteredPersons = this.persons.filter((person: IPerson) =>
            person.name.toLowerCase().includes(selectedPerson.toLowerCase())
          );
        } else if (selectedPerson?.slug) {
          this.selectedPerson = selectedPerson;
        }
      }
    );
  }

  mutateSelectionForDisplay(person: IPerson) {
    return person?.name;
  }

  ngOnDestroy() {
    this.formControlSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
  }
}
