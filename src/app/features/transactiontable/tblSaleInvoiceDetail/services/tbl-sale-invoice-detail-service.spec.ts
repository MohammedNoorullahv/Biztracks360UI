import { TestBed } from '@angular/core/testing';

import { TblSaleInvoiceDetailService } from './tbl-sale-invoice-detail-service';

describe('TblSaleInvoiceDetailService', () => {
  let service: TblSaleInvoiceDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblSaleInvoiceDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
