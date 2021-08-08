import { TestBed } from '@angular/core/testing';

import { TextylService } from './textyl-service.service';

describe('TextylService', () => {
  let service: TextylService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextylService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
