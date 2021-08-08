import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsSearchComponent } from './lyrics-search.component';

describe('LyricsSearchComponent', () => {
  let component: LyricsSearchComponent;
  let fixture: ComponentFixture<LyricsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LyricsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LyricsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
