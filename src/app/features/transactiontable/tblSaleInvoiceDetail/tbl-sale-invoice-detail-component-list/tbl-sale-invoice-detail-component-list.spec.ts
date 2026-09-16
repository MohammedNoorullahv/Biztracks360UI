import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblSaleInvoiceDetailComponentList } from './tbl-sale-invoice-detail-component-list';

describe('TblSaleInvoiceDetailComponentList', () => {
  let component: TblSaleInvoiceDetailComponentList;
  let fixture: ComponentFixture<TblSaleInvoiceDetailComponentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblSaleInvoiceDetailComponentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblSaleInvoiceDetailComponentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
