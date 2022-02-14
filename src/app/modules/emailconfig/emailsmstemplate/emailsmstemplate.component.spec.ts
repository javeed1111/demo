import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsmstemplateComponent } from './emailsmstemplate.component';

describe('EmailsmstemplateComponent', () => {
  let component: EmailsmstemplateComponent;
  let fixture: ComponentFixture<EmailsmstemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsmstemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsmstemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
