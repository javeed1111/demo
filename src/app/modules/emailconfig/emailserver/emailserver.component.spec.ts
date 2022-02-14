import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailserverComponent } from './emailserver.component';

describe('EmailserverComponent', () => {
  let component: EmailserverComponent;
  let fixture: ComponentFixture<EmailserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
