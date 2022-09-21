import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerDemoComponent } from './progress-spinner-demo.component';

describe('ProgressSpinnerDemoComponent', () => {
  let component: ProgressSpinnerDemoComponent;
  let fixture: ComponentFixture<ProgressSpinnerDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
