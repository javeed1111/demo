import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditconfigurationsComponent } from './editconfigurations.component';

describe('EditconfigurationsComponent', () => {
  let component: EditconfigurationsComponent;
  let fixture: ComponentFixture<EditconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditconfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
