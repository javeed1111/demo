import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardbannerComponent } from './dashboardbanner.component';

describe('DashboardbannerComponent', () => {
  let component: DashboardbannerComponent;
  let fixture: ComponentFixture<DashboardbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardbannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
