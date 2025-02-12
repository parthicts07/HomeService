import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalNavbarComponent } from './professional-navbar.component';

describe('ProfessionalNavbarComponent', () => {
  let component: ProfessionalNavbarComponent;
  let fixture: ComponentFixture<ProfessionalNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalNavbarComponent]
    });
    fixture = TestBed.createComponent(ProfessionalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
