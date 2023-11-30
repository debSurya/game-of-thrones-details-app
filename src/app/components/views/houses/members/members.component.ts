import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IMember } from '../houses.interface';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  @Input() houseImageSrc: string = '';
  @Input() members: IMember[] = [];

  constructor(private router: Router) {}

  routeToPersonDetails(slug: string) {
    this.router.navigate(['/persons'], {
      state: {
        person: slug,
      },
    });
  }
}
