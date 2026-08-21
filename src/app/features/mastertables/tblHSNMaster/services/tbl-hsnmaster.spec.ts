import { TestBed } from '@angular/core/testing';

import { TblHSNMaster } from './tbl-hsnmaster';

describe('TblHSNMaster', () => {
  let service: TblHSNMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblHSNMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
