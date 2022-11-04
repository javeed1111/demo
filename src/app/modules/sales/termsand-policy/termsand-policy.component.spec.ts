import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandPolicyComponent } from './termsand-policy.component';

describe('TermsandPolicyComponent', () => {
  let component: TermsandPolicyComponent;
  let fixture: ComponentFixture<TermsandPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsandPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
