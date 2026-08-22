import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPartyMasterList } from './tbl-party-master-list';

describe('TblPartyMasterList', () => {
  let component: TblPartyMasterList;
  let fixture: ComponentFixture<TblPartyMasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPartyMasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPartyMasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
