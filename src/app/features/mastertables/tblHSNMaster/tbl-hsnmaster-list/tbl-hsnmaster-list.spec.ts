import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblHSNMasterList } from './tbl-hsnmaster-list';

describe('TblHSNMasterList', () => {
  let component: TblHSNMasterList;
  let fixture: ComponentFixture<TblHSNMasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblHSNMasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblHSNMasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
