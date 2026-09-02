import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCounterInvoiceList } from './tbl-counter-invoice-list';

describe('TblCounterInvoiceList', () => {
  let component: TblCounterInvoiceList;
  let fixture: ComponentFixture<TblCounterInvoiceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCounterInvoiceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCounterInvoiceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
