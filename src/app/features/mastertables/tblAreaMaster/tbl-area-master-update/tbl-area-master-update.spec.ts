import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblAreaMasterUpdate } from './tbl-area-master-update';

describe('TblAreaMasterUpdate', () => {
  let component: TblAreaMasterUpdate;
  let fixture: ComponentFixture<TblAreaMasterUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblAreaMasterUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblAreaMasterUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
