import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPurchaseOrderAdd } from './tbl-purchase-order-add';

describe('TblPurchaseOrderAdd', () => {
  let component: TblPurchaseOrderAdd;
  let fixture: ComponentFixture<TblPurchaseOrderAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPurchaseOrderAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPurchaseOrderAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
