import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCounterInvoiceDetailAdd } from './tbl-counter-invoice-detail-add';

describe('TblCounterInvoiceDetailAdd', () => {
  let component: TblCounterInvoiceDetailAdd;
  let fixture: ComponentFixture<TblCounterInvoiceDetailAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCounterInvoiceDetailAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCounterInvoiceDetailAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
