import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalRatingsComponent } from './professional-ratings.component';

describe('ProfessionalRatingsComponent', () => {
  let component: ProfessionalRatingsComponent;
  let fixture: ComponentFixture<ProfessionalRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalRatingsComponent]
    });
    fixture = TestBed.createComponent(ProfessionalRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
