import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseplanlistComponent } from './courseplanlist.component';

describe('CourseplanlistComponent', () => {
  let component: CourseplanlistComponent;
  let fixture: ComponentFixture<CourseplanlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseplanlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseplanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
