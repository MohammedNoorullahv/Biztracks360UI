import { TestBed } from '@angular/core/testing';

import { TblPurchaseOrder } from './tbl-purchase-order';

describe('TblPurchaseOrder', () => {
  let service: TblPurchaseOrder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblPurchaseOrder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
