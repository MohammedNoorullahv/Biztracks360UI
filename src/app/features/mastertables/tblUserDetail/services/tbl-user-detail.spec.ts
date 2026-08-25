import { TestBed } from '@angular/core/testing';

import { TblUserDetail } from './tbl-user-detail';

describe('TblUserDetail', () => {
  let service: TblUserDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblUserDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
