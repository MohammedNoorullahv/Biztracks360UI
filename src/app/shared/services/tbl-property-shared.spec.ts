import { TestBed } from '@angular/core/testing';

import { TblPropertyShared } from './tbl-property-shared';

describe('TblPropertyShared', () => {
  let service: TblPropertyShared;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblPropertyShared);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
