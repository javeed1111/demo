import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserssubscribedcoursesComponent } from './userssubscribedcourses.component';

describe('UserssubscribedcoursesComponent', () => {
  let component: UserssubscribedcoursesComponent;
  let fixture: ComponentFixture<UserssubscribedcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserssubscribedcoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserssubscribedcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
