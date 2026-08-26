import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPartyDetailList } from './tbl-party-detail-list';

describe('TblPartyDetailList', () => {
  let component: TblPartyDetailList;
  let fixture: ComponentFixture<TblPartyDetailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPartyDetailList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPartyDetailList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
