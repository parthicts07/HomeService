import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalProfileComponent } from './professional-profile.component';

describe('ProfessionalProfileComponent', () => {
  let component: ProfessionalProfileComponent;
  let fixture: ComponentFixture<ProfessionalProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalProfileComponent]
    });
    fixture = TestBed.createComponent(ProfessionalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
