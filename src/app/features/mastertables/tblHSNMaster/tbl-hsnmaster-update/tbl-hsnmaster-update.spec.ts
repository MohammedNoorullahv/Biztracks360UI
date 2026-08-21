import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblHSNMasterUpdate } from './tbl-hsnmaster-update';

describe('TblHSNMasterUpdate', () => {
  let component: TblHSNMasterUpdate;
  let fixture: ComponentFixture<TblHSNMasterUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblHSNMasterUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblHSNMasterUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
