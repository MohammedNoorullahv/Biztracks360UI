import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUserDetailList } from './tbl-user-detail-list';

describe('TblUserDetailList', () => {
  let component: TblUserDetailList;
  let fixture: ComponentFixture<TblUserDetailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUserDetailList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUserDetailList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
