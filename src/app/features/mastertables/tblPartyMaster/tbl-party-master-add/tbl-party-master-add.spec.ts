import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPartyMasterAdd } from './tbl-party-master-add';

describe('TblPartyMasterAdd', () => {
  let component: TblPartyMasterAdd;
  let fixture: ComponentFixture<TblPartyMasterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblPartyMasterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblPartyMasterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
