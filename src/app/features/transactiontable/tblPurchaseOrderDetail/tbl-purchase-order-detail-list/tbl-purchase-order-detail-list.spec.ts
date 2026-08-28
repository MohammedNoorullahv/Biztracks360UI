import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPurchaseOrderDetailList } from './tbl-purchase-order-detail-list';

describe('TblPurchaseOrderDetailList', () => {
  let component: TblPurchaseOrderDetailList;
  let fixture: ComponentFixture<TblPurchaseOrderDetailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPurchaseOrderDetailList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPurchaseOrderDetailList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
