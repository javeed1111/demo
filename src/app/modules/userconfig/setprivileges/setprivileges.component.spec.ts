import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetprivilegesComponent } from './setprivileges.component';

describe('SetprivilegesComponent', () => {
  let component: SetprivilegesComponent;
  let fixture: ComponentFixture<SetprivilegesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetprivilegesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetprivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
