import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblAreaMasterList } from './tbl-area-master-list';

describe('TblAreaMasterList', () => {
  let component: TblAreaMasterList;
  let fixture: ComponentFixture<TblAreaMasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblAreaMasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblAreaMasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
