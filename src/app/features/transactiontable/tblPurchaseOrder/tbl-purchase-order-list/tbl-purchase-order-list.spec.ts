import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPurchaseOrderList } from './tbl-purchase-order-list';

describe('TblPurchaseOrderList', () => {
  let component: TblPurchaseOrderList;
  let fixture: ComponentFixture<TblPurchaseOrderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPurchaseOrderList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPurchaseOrderList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
