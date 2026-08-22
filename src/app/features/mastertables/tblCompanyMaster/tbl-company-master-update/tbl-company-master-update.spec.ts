import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCompanyMasterUpdate } from './tbl-company-master-update';

describe('TblCompanyMasterUpdate', () => {
  let component: TblCompanyMasterUpdate;
  let fixture: ComponentFixture<TblCompanyMasterUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCompanyMasterUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCompanyMasterUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
