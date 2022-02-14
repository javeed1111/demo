import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryfollowupComponent } from './enquiryfollowup.component';

describe('EnquiryfollowupComponent', () => {
  let component: EnquiryfollowupComponent;
  let fixture: ComponentFixture<EnquiryfollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryfollowupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryfollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
