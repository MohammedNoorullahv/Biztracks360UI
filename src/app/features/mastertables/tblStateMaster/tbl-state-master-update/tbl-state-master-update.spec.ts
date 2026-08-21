import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblStateMasterUpdate } from './tbl-state-master-update';

describe('TblStateMasterUpdate', () => {
  let component: TblStateMasterUpdate;
  let fixture: ComponentFixture<TblStateMasterUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblStateMasterUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblStateMasterUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
