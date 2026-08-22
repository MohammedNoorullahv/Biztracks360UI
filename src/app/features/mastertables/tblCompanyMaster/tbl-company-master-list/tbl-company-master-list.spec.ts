import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblCompanyMasterList } from './tbl-company-master-list';

describe('TblCompanyMasterList', () => {
  let component: TblCompanyMasterList;
  let fixture: ComponentFixture<TblCompanyMasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblCompanyMasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblCompanyMasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
