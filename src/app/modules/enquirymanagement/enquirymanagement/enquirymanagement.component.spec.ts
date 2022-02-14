import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirymanagementComponent } from './enquirymanagement.component';

describe('EnquirymanagementComponent', () => {
  let component: EnquirymanagementComponent;
  let fixture: ComponentFixture<EnquirymanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirymanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
