import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursecontentComponent } from './Addcoursecontent.component';

describe('AddcoursecontentComponent', () => {
  let component: AddcoursecontentComponent;
  let fixture: ComponentFixture<AddcoursecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcoursecontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcoursecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
