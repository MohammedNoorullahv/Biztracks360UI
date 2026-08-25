import { TestBed } from '@angular/core/testing';

import { TblUserHeader } from './tbl-user-header';

describe('TblUserHeader', () => {
  let service: TblUserHeader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblUserHeader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
