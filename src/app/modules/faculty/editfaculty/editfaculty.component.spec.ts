import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfacultyComponent } from './editfaculty.component';

describe('EditfacultyComponent', () => {
  let component: EditfacultyComponent;
  let fixture: ComponentFixture<EditfacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
