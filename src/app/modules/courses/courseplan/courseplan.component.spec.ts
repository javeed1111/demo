import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseplanComponent } from './courseplan.component';

describe('CourseplanComponent', () => {
  let component: CourseplanComponent;
  let fixture: ComponentFixture<CourseplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
