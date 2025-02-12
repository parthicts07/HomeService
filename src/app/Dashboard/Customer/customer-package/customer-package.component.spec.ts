import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPackageComponent } from './customer-package.component';

describe('CustomerPackageComponent', () => {
  let component: CustomerPackageComponent;
  let fixture: ComponentFixture<CustomerPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPackageComponent]
    });
    fixture = TestBed.createComponent(CustomerPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
