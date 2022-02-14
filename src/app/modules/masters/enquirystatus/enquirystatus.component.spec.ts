import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirystatusComponent } from './enquirystatus.component';

describe('EnquirystatusComponent', () => {
  let component: EnquirystatusComponent;
  let fixture: ComponentFixture<EnquirystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
