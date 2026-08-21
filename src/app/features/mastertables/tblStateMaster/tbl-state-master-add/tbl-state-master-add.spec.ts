import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblStateMasterAdd } from './tbl-state-master-add';

describe('TblStateMasterAdd', () => {
  let component: TblStateMasterAdd;
  let fixture: ComponentFixture<TblStateMasterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblStateMasterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblStateMasterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
