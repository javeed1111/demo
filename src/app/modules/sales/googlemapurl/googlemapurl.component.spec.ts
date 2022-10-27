import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglemapurlComponent } from './googlemapurl.component';

describe('GooglemapurlComponent', () => {
  let component: GooglemapurlComponent;
  let fixture: ComponentFixture<GooglemapurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglemapurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglemapurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
