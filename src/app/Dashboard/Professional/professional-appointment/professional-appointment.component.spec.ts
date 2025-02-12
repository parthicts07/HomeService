import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAppointmentComponent } from './professional-appointment.component';

describe('ProfessionalAppointmentComponent', () => {
  let component: ProfessionalAppointmentComponent;
  let fixture: ComponentFixture<ProfessionalAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalAppointmentComponent]
    });
    fixture = TestBed.createComponent(ProfessionalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
