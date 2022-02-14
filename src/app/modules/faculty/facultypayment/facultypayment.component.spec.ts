import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultypaymentComponent } from './facultypayment.component';

describe('FacultypaymentComponent', () => {
  let component: FacultypaymentComponent;
  let fixture: ComponentFixture<FacultypaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultypaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultypaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
