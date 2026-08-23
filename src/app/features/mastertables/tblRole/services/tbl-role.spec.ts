import { TestBed } from '@angular/core/testing';

import { TblRole } from './tbl-role';

describe('TblRole', () => {
  let service: TblRole;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblRole);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
