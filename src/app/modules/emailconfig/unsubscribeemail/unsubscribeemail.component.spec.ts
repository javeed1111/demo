import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeemailComponent } from './unsubscribeemail.component';

describe('UnsubscribeemailComponent', () => {
  let component: UnsubscribeemailComponent;
  let fixture: ComponentFixture<UnsubscribeemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubscribeemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
