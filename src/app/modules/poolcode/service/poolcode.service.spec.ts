import { TestBed } from '@angular/core/testing';

import { PoolcodeService } from './poolcode.service';

describe('PoolcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoolcodeService = TestBed.get(PoolcodeService);
    expect(service).toBeTruthy();
  });
});
