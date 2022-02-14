import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailschedularComponent } from './emailschedular.component';

describe('EmailschedularComponent', () => {
  let component: EmailschedularComponent;
  let fixture: ComponentFixture<EmailschedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailschedularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailschedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
