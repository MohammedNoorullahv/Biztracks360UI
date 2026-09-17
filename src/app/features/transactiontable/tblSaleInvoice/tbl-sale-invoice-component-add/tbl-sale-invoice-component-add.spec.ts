import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblSaleInvoiceComponentAdd } from './tbl-sale-invoice-component-add';

describe('TblSaleInvoiceComponentAdd', () => {
  let component: TblSaleInvoiceComponentAdd;
  let fixture: ComponentFixture<TblSaleInvoiceComponentAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblSaleInvoiceComponentAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblSaleInvoiceComponentAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
