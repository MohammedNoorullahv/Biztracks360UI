import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblStateMasterList } from './tbl-state-master-list';

describe('TblStateMasterList', () => {
  let component: TblStateMasterList;
  let fixture: ComponentFixture<TblStateMasterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblStateMasterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblStateMasterList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
