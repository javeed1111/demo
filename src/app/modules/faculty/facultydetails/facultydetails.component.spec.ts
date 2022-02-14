import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultydetailsComponent } from './facultydetails.component';

describe('FacultydetailsComponent', () => {
  let component: FacultydetailsComponent;
  let fixture: ComponentFixture<FacultydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultydetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
