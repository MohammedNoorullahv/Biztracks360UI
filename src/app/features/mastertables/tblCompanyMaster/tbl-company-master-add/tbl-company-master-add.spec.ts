import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCompanyMasterAdd } from './tbl-company-master-add';

describe('TblCompanyMasterAdd', () => {
  let component: TblCompanyMasterAdd;
  let fixture: ComponentFixture<TblCompanyMasterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCompanyMasterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCompanyMasterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
