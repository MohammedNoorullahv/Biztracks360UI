import { TestBed } from '@angular/core/testing';

import { TblPartyDetail } from './tbl-party-detail';

describe('TblPartyDetail', () => {
  let service: TblPartyDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblPartyDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
