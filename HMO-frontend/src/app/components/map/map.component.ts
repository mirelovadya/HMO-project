import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;
declare var google: any
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  title: string = 'AGM project';
  latitude: any;
  longitude: any;
  zoom: any;
  address: any;
  date: any
  displayError = false
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef: ElementRef | undefined;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
      autocomplete.addListener("place_changed", (tt: any) => {
        debugger
        this.ngZone.run(() => {
          let place: any = autocomplete.getPlace()
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          let map = `https://maps.google.com/maps?q=${this.latitude},${this.longitude}&hl=he&z=14&amp;&output=embed`
          let frame = $(`<iframe style="width: 100%; height: 300px;" src="${map}">`);
          $('#maps').html(frame);
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    debugger
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
        let map = `https://maps.google.com/maps?q=${this.latitude},${this.longitude}&hl=he&z=14&amp;&output=embed`
        let frame = $(`<iframe style="width: 100%; height: 300px;" src="${map}">`);
        $('#maps').html(frame);
      });
    }
  }

  getAddress(latitude: any, longitude: any) {
    debugger
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  createIsolation() {
    if (!this.date) {
      this.displayError = true;
      return false
    }
    else {
      return new Promise((resolve, reject) => {
        this.dataService.apiName = "api/create-isolation";
        let data = {
          latitude: this.latitude,
          longitude: this.longitude,
          date: this.date
        }
        this.dataService.getDataByObject({ data }).subscribe(results => {
          resolve(true);
        }, err => {
          console.log(err);
        })
      });
    }
  }
}
