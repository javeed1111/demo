import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaillistComponent } from './emaillist.component';

describe('EmaillistComponent', () => {
  let component: EmaillistComponent;
  let fixture: ComponentFixture<EmaillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmaillistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
