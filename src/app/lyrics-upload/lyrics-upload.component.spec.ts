import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsUploadComponent } from './lyrics-upload.component';

describe('LyricsUploadComponent', () => {
  let component: LyricsUploadComponent;
  let fixture: ComponentFixture<LyricsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
