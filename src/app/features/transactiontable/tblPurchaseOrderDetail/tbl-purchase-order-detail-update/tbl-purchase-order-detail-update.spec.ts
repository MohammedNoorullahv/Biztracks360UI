import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPurchaseOrderDetailUpdate } from './tbl-purchase-order-detail-update';

describe('TblPurchaseOrderDetailUpdate', () => {
  let component: TblPurchaseOrderDetailUpdate;
  let fixture: ComponentFixture<TblPurchaseOrderDetailUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPurchaseOrderDetailUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPurchaseOrderDetailUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
