import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUserDetailAdd } from './tbl-user-detail-add';

describe('TblUserDetailAdd', () => {
  let component: TblUserDetailAdd;
  let fixture: ComponentFixture<TblUserDetailAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUserDetailAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUserDetailAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
