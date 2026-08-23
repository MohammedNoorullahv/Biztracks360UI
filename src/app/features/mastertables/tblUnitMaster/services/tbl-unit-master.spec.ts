import { TestBed } from '@angular/core/testing';

import { TblUnitMaster } from './tbl-unit-master';

describe('TblUnitMaster', () => {
  let service: TblUnitMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblUnitMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
