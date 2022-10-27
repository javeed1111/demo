import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgooglemapurlComponent } from './addgooglemapurl.component';

describe('AddgooglemapurlComponent', () => {
  let component: AddgooglemapurlComponent;
  let fixture: ComponentFixture<AddgooglemapurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgooglemapurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgooglemapurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
