import { TestBed } from '@angular/core/testing';

import { TblStateMaster } from './tbl-state-master';

describe('TblStateMaster', () => {
  let service: TblStateMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblStateMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
