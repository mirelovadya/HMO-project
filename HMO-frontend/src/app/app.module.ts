import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';
import { NgChartsModule } from 'ng2-charts';
import { ActivePatientsComponent } from './components/graphs/active-patients/active-patients.component';
import { VaccinatedComponent } from './components/graphs/vaccinated/vaccinated.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    MapComponent,
    NavComponent,
    ActivePatientsComponent,
    VaccinatedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAzvZZesOgZkN2AS4ROOjdDfXXLtpVKA_E",
      libraries: ['places']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
