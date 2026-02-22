import { TestBed } from '@angular/core/testing';

import { PathCorService } from './path-cor-service';

describe('PathCorService', () => {
  let service: PathCorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathCorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
