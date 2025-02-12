import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentsComponent } from './customer-payments.component';

describe('CustomerPaymentsComponent', () => {
  let component: CustomerPaymentsComponent;
  let fixture: ComponentFixture<CustomerPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPaymentsComponent]
    });
    fixture = TestBed.createComponent(CustomerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
