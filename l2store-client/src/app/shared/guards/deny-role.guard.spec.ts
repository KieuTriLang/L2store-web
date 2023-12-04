import { TestBed } from '@angular/core/testing';

import { DenyRoleGuard } from './deny-role.guard';

describe('DenyRoleGuard', () => {
  let guard: DenyRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DenyRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
