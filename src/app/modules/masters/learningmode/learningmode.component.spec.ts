import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningmodeComponent } from './learningmode.component';

describe('LearningmodeComponent', () => {
  let component: LearningmodeComponent;
  let fixture: ComponentFixture<LearningmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningmodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
