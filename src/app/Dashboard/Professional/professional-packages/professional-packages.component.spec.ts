import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalPackagesComponent } from './professional-packages.component';

describe('ProfessionalPackagesComponent', () => {
  let component: ProfessionalPackagesComponent;
  let fixture: ComponentFixture<ProfessionalPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalPackagesComponent]
    });
    fixture = TestBed.createComponent(ProfessionalPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
