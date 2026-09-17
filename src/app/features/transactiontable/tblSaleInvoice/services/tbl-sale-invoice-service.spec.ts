import { TestBed } from '@angular/core/testing';

import { TblSaleInvoiceService } from './tbl-sale-invoice-service';

describe('TblSaleInvoiceService', () => {
  let service: TblSaleInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblSaleInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
