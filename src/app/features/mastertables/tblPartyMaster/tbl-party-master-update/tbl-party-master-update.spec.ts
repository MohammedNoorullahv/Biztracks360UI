import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPartyMasterUpdate } from './tbl-party-master-update';

describe('TblPartyMasterUpdate', () => {
  let component: TblPartyMasterUpdate;
  let fixture: ComponentFixture<TblPartyMasterUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPartyMasterUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPartyMasterUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
