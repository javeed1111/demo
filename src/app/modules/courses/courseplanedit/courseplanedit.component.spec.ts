import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseplaneditComponent } from './courseplanedit.component';

describe('CourseplaneditComponent', () => {
  let component: CourseplaneditComponent;
  let fixture: ComponentFixture<CourseplaneditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseplaneditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseplaneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
