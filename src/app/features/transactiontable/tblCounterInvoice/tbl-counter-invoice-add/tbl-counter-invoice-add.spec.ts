import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCounterInvoiceAdd } from './tbl-counter-invoice-add';

describe('TblCounterInvoiceAdd', () => {
  let component: TblCounterInvoiceAdd;
  let fixture: ComponentFixture<TblCounterInvoiceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCounterInvoiceAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCounterInvoiceAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
