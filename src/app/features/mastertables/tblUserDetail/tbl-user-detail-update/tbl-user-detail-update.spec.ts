import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUserDetailUpdate } from './tbl-user-detail-update';

describe('TblUserDetailUpdate', () => {
  let component: TblUserDetailUpdate;
  let fixture: ComponentFixture<TblUserDetailUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUserDetailUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUserDetailUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
