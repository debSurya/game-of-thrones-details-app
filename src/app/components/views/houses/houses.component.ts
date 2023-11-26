import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';

import { GotDataService } from 'src/app/services/got-data.service';
import { IHouse, IMember } from './houses.interface';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
  ],
})
export class HousesComponent {
  control = new FormControl();
  houses: IHouse[] = [];
  members: IMember[] = [];
  serviceSub: Subscription | null = null;
  formControlSub: Subscription | null = null;

  constructor(private getGOTDataService: GotDataService) {}

  ngOnInit() {
    this.serviceSub = this.getGOTDataService
      .getGOTHouseData()
      .subscribe((data: IHouse[]) => {
        console.log(data);
        this.houses = data;
      });
    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedHouse: IHouse | null) => {
        console.log(selectedHouse);
        this.members = selectedHouse?.members ?? [];
      }
    );
  }

  mutateSelectionForDisplay(house: IHouse) {
    return house.name;
  }

  ngOnDestroy() {
    this.formControlSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
  }
}
