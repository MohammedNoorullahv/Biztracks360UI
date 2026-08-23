import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUnitMasterList } from './tbl-unit-master-list';

describe('TblUnitMasterList', () => {
  let component: TblUnitMasterList;
  let fixture: ComponentFixture<TblUnitMasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUnitMasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUnitMasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
