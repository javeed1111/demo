import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralrequestsComponent } from './referralrequests.component';

describe('ReferralrequestsComponent', () => {
  let component: ReferralrequestsComponent;
  let fixture: ComponentFixture<ReferralrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
