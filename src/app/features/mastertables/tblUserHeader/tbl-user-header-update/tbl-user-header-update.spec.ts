import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUserHeaderUpdate } from './tbl-user-header-update';

describe('TblUserHeaderUpdate', () => {
  let component: TblUserHeaderUpdate;
  let fixture: ComponentFixture<TblUserHeaderUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUserHeaderUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUserHeaderUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
