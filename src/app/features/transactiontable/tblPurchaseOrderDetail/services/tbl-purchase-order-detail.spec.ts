import { TestBed } from '@angular/core/testing';

import { TblPurchaseOrderDetail } from './tbl-purchase-order-detail';

describe('TblPurchaseOrderDetail', () => {
  let service: TblPurchaseOrderDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblPurchaseOrderDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
