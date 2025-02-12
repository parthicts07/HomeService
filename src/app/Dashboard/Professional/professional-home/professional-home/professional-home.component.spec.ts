import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalHomeComponent } from './professional-home.component';

describe('ProfessionalHomeComponent', () => {
  let component: ProfessionalHomeComponent;
  let fixture: ComponentFixture<ProfessionalHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalHomeComponent]
    });
    fixture = TestBed.createComponent(ProfessionalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
