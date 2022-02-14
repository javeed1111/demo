import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsendingComponent } from './emailsending.component';

describe('EmailsendingComponent', () => {
  let component: EmailsendingComponent;
  let fixture: ComponentFixture<EmailsendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
