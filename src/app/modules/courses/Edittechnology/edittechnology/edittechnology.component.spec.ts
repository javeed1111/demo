import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittechnologyComponent } from './edittechnology.component';

describe('EdittechnologyComponent', () => {
  let component: EdittechnologyComponent;
  let fixture: ComponentFixture<EdittechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittechnologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
