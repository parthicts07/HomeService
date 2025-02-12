import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalLoginComponent } from './professional-login.component';

describe('ProfessionalLoginComponent', () => {
  let component: ProfessionalLoginComponent;
  let fixture: ComponentFixture<ProfessionalLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalLoginComponent]
    });
    fixture = TestBed.createComponent(ProfessionalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
