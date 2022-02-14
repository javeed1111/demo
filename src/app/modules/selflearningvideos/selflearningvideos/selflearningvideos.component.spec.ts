import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelflearningvideosComponent } from './selflearningvideos.component';

describe('SelflearningvideosComponent', () => {
  let component: SelflearningvideosComponent;
  let fixture: ComponentFixture<SelflearningvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelflearningvideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelflearningvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
