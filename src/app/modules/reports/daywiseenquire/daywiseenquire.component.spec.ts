import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywiseenquireComponent } from './daywiseenquire.component';

describe('DaywiseenquireComponent', () => {
  let component: DaywiseenquireComponent;
  let fixture: ComponentFixture<DaywiseenquireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaywiseenquireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaywiseenquireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
