import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressspinnerComponent } from './progressspinner.component';

describe('ProgressspinnerComponent', () => {
  let component: ProgressspinnerComponent;
  let fixture: ComponentFixture<ProgressspinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressspinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
