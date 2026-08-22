import { TestBed } from '@angular/core/testing';

import { TblCompanyMaster } from './tbl-company-master';

describe('TblCompanyMaster', () => {
  let service: TblCompanyMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblCompanyMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
