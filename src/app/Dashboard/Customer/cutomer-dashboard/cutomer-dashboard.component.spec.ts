import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerDashboardComponent } from './cutomer-dashboard.component';

describe('CutomerDashboardComponent', () => {
  let component: CutomerDashboardComponent;
  let fixture: ComponentFixture<CutomerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CutomerDashboardComponent]
    });
    fixture = TestBed.createComponent(CutomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
