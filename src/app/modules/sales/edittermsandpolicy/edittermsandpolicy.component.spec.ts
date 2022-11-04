import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittermsandpolicyComponent } from './edittermsandpolicy.component';

describe('EdittermsandpolicyComponent', () => {
  let component: EdittermsandpolicyComponent;
  let fixture: ComponentFixture<EdittermsandpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittermsandpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittermsandpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
