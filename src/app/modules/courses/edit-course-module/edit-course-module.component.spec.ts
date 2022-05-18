import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseModuleComponent } from './edit-course-module.component';

describe('EditCourseModuleComponent', () => {
  let component: EditCourseModuleComponent;
  let fixture: ComponentFixture<EditCourseModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
