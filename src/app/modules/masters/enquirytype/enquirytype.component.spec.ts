import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirytypeComponent } from './enquirytype.component';

describe('EnquirytypeComponent', () => {
  let component: EnquirytypeComponent;
  let fixture: ComponentFixture<EnquirytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquirytypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
