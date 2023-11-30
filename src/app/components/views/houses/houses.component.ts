import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { GotDataService } from 'src/app/services/got-data.service';
import { IHouse, IMember } from './houses.interface';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HousesComponent implements OnInit {
  control = new FormControl();
  houses: IHouse[] = [];
  members: IMember[] = [];
  filteredHouses: IHouse[] = [];
  serviceSub: Subscription | null = null;
  formControlSub: Subscription | null = null;
  selectedHouseImageSrc: string = '';

  constructor(private getGOTDataService: GotDataService) {}

  ngOnInit() {
    this.serviceSub = this.getGOTDataService
      .getGOTHouseData()
      .subscribe((data: IHouse[]) => {
        this.houses = this.filteredHouses = data;
        if (history.state?.house) {
          this.control.setValue(
            this.houses.find(
              (house: IHouse) => house.slug === history.state.house
            )
          );
        }
      });

    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedHouse: IHouse | string) => {
        if (typeof selectedHouse === 'string') {
          this.filteredHouses = this.houses.filter((house: IHouse) =>
            house.name.toLowerCase().includes(selectedHouse.toLowerCase())
          );
        } else if (selectedHouse?.slug) {
          this.members = selectedHouse?.members ?? [];
          this.selectedHouseImageSrc = `./assets/images/${selectedHouse.slug}.png`;
        }
      }
    );
  }

  mutateSelectionForDisplay(house: IHouse) {
    return house?.name;
  }

  ngOnDestroy() {
    this.formControlSub?.unsubscribe();
    this.serviceSub?.unsubscribe();
  }
}
