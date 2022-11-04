import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgooglemapurlComponent } from './editgooglemapurl.component';

describe('EditgooglemapurlComponent', () => {
  let component: EditgooglemapurlComponent;
  let fixture: ComponentFixture<EditgooglemapurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditgooglemapurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgooglemapurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
