import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblAreaMasterAdd } from './tbl-area-master-add';

describe('TblAreaMasterAdd', () => {
  let component: TblAreaMasterAdd;
  let fixture: ComponentFixture<TblAreaMasterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblAreaMasterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblAreaMasterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
