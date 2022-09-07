import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddashboardbannerComponent } from './adddashboardbanner.component';

describe('AdddashboardbannerComponent', () => {
  let component: AdddashboardbannerComponent;
  let fixture: ComponentFixture<AdddashboardbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddashboardbannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddashboardbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
