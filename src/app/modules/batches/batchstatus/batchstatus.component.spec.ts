import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchstatusComponent } from './batchstatus.component';

describe('BatchstatusComponent', () => {
  let component: BatchstatusComponent;
  let fixture: ComponentFixture<BatchstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
