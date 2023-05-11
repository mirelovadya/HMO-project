import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HMO-front';
  showMapModal = false;

  openMapModal() {
    this.showMapModal = true
  }
}
