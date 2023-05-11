import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router: Router) {

  }
  // navigator
  navigateTo(to: string, page?: any) {
    switch (to) {

      case "customers":
        this.router.navigate(['customers']);
        break;
      case "map":
        this.router.navigate(['map']);
        break;
      case "vaccinated":
        this.router.navigate(['vaccinated']);
        break;
      case "activePatients":
        this.router.navigate(['activePatients']);
        break;
      default:
        break;
    }
  }
}
