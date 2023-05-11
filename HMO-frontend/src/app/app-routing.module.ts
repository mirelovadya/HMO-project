import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { MapComponent } from './components/map/map.component';
import { VaccinatedComponent } from './components/graphs/vaccinated/vaccinated.component';
import { ActivePatientsComponent } from './components/graphs/active-patients/active-patients.component';

const routes: Routes = [
  {
    path: "",
    component: CustomersComponent
  }, {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "vaccinated",
    component: VaccinatedComponent
  },
  {
    path: "activePatients",
    component: ActivePatientsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
