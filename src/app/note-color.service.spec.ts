import { TestBed } from '@angular/core/testing';

import { NoteColorService } from './note-color.service';

describe('NoteColorService', () => {
  let service: NoteColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
