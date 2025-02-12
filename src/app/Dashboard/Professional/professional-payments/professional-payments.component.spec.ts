import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalPaymentsComponent } from './professional-payments.component';

describe('ProfessionalPaymentsComponent', () => {
  let component: ProfessionalPaymentsComponent;
  let fixture: ComponentFixture<ProfessionalPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalPaymentsComponent]
    });
    fixture = TestBed.createComponent(ProfessionalPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
