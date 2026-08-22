import { TestBed } from '@angular/core/testing';

import { TblPartyMaster } from './tbl-party-master';

describe('TblPartyMaster', () => {
  let service: TblPartyMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblPartyMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
