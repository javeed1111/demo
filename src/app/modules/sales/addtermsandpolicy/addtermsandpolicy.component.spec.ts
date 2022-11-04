import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtermsandpolicyComponent } from './addtermsandpolicy.component';

describe('AddtermsandpolicyComponent', () => {
  let component: AddtermsandpolicyComponent;
  let fixture: ComponentFixture<AddtermsandpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtermsandpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtermsandpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
