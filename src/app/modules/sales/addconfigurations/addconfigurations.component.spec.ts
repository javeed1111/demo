import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconfigurationsComponent } from './addconfigurations.component';

describe('AddconfigurationsComponent', () => {
  let component: AddconfigurationsComponent;
  let fixture: ComponentFixture<AddconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddconfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
