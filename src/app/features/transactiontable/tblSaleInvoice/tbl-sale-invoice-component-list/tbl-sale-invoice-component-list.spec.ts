import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblSaleInvoiceComponentList } from './tbl-sale-invoice-component-list';

describe('TblSaleInvoiceComponentList', () => {
  let component: TblSaleInvoiceComponentList;
  let fixture: ComponentFixture<TblSaleInvoiceComponentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblSaleInvoiceComponentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblSaleInvoiceComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
