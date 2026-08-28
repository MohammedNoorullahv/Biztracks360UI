import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPurchaseOrderDetailAdd } from './tbl-purchase-order-detail-add';

describe('TblPurchaseOrderDetailAdd', () => {
  let component: TblPurchaseOrderDetailAdd;
  let fixture: ComponentFixture<TblPurchaseOrderDetailAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPurchaseOrderDetailAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPurchaseOrderDetailAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
