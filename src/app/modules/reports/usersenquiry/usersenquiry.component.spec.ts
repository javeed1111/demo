import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersenquiryComponent } from './usersenquiry.component';

describe('UsersenquiryComponent', () => {
  let component: UsersenquiryComponent;
  let fixture: ComponentFixture<UsersenquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersenquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersenquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
