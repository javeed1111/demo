import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtechnologyComponent } from './addtechnology.component';

describe('AddtechnologyComponent', () => {
  let component: AddtechnologyComponent;
  let fixture: ComponentFixture<AddtechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtechnologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
