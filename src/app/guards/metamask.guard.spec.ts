import { TestBed } from '@angular/core/testing';

import { MetamaskGuard } from './metamask.guard';

describe('MetamaskGuard', () => {
  let guard: MetamaskGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MetamaskGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
