import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCounterInvoiceDetail } from './tbl-counter-invoice-detail';

describe('TblCounterInvoiceDetail', () => {
  let component: TblCounterInvoiceDetail;
  let fixture: ComponentFixture<TblCounterInvoiceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCounterInvoiceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCounterInvoiceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
