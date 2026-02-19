import { TestBed } from '@angular/core/testing';

import { Bearbeiten } from './bearbeiten';

describe('Bearbeiten', () => {
  let service: Bearbeiten;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bearbeiten);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
