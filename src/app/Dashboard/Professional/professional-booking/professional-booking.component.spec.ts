import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalBookingComponent } from './professional-booking.component';

describe('ProfessionalBookingComponent', () => {
  let component: ProfessionalBookingComponent;
  let fixture: ComponentFixture<ProfessionalBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalBookingComponent]
    });
    fixture = TestBed.createComponent(ProfessionalBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
