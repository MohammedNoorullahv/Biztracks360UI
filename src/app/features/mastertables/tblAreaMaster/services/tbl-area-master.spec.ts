import { TestBed } from '@angular/core/testing';

import { TblAreaMaster } from './tbl-area-master';

describe('TblAreaMaster', () => {
  let service: TblAreaMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblAreaMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
