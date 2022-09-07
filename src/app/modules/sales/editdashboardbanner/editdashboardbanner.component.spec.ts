import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdashboardbannerComponent } from './editdashboardbanner.component';

describe('EditdashboardbannerComponent', () => {
  let component: EditdashboardbannerComponent;
  let fixture: ComponentFixture<EditdashboardbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdashboardbannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdashboardbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
