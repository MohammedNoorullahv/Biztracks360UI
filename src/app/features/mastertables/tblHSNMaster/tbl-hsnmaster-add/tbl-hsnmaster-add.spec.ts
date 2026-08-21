import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblHSNMasterAdd } from './tbl-hsnmaster-add';

describe('TblHSNMasterAdd', () => {
  let component: TblHSNMasterAdd;
  let fixture: ComponentFixture<TblHSNMasterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblHSNMasterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblHSNMasterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
