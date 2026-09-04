import { TestBed } from '@angular/core/testing';

import { TblCounterInvoiceDetail } from './tbl-counter-invoice-detail';

describe('TblCounterInvoiceDetail', () => {
  let service: TblCounterInvoiceDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblCounterInvoiceDetail);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
