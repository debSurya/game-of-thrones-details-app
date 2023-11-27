import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';

import { GotDataService } from 'src/app/services/got-data.service';
import { IHouse, IMember } from './houses.interface';
import { ActivatedRoute, Router } from '@angular/router';

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
        this.houses = data;
        this.routeSub = this.route.params.subscribe((params) => {
          const selectedHouse = this.houses.find(
            (house) => house.slug === params['house']
          );
          this.members = selectedHouse?.members ?? [];
          this.control.setValue(selectedHouse);
        });
      });
    this.formControlSub = this.control.valueChanges.subscribe(
      (selectedHouse: IHouse | null) => {
        console.log(selectedHouse);
        this.router.navigate(['/houses', selectedHouse?.slug]);
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
