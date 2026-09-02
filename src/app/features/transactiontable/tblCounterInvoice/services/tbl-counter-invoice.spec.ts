import { TestBed } from '@angular/core/testing';

import { TblCounterInvoice } from './tbl-counter-invoice';

describe('TblCounterInvoice', () => {
  let service: TblCounterInvoice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TblCounterInvoice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
