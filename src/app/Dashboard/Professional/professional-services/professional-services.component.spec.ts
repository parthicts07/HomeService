import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalServicesComponent } from './professional-services.component';

describe('ProfessionalServicesComponent', () => {
  let component: ProfessionalServicesComponent;
  let fixture: ComponentFixture<ProfessionalServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalServicesComponent]
    });
    fixture = TestBed.createComponent(ProfessionalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
