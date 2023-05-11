import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinatedComponent } from './vaccinated.component';

describe('VaccinatedComponent', () => {
  let component: VaccinatedComponent;
  let fixture: ComponentFixture<VaccinatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccinatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
