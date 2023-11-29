import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

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
    CommonModule,
  ],
})
export class HousesComponent implements OnInit {
  control = new FormControl();
  houses: IHouse[] = [];
  members: IMember[] = [];
  filteredHouses: IHouse[] = [];
  serviceSub: Subscription | null = null;
  formControlSub: Subscription | null = null;
  routeSub: Subscription | null = null;

  constructor(
    private getGOTDataService: GotDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.serviceSub = this.getGOTDataService
      .getGOTHouseData()
      .subscribe((data: IHouse[]) => {
        console.log(data);
        this.houses = this.filteredHouses = data;
        this.routeSub = this.route.params.subscribe((params) => {
          const selectedHouse = this.houses.find(
            (house) => house.slug === params['house']
          );
          this.members = selectedHouse?.members ?? [];
          this.control.setValue(selectedHouse);
        });
      });

    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedHouse: IHouse | string) => {
        if (typeof selectedHouse === 'string') {
          this.filteredHouses = this.houses.filter((house: IHouse) =>
            house.name.toLowerCase().includes(selectedHouse.toLowerCase())
          );
        } else if (selectedHouse?.slug) {
          this.router.navigate(['/houses', selectedHouse.slug]);
        }
      }
    );
  }

  mutateSelectionForDisplay(house: IHouse) {
    return house?.name;
  }

  routeToPersonDetails(slug: string) {
    this.router.navigate(['/persons', slug]);
  }

  ngOnDestroy() {
    this.formControlSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }
}
