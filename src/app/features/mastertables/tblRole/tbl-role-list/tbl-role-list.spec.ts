import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblRoleList } from './tbl-role-list';

describe('TblRoleList', () => {
  let component: TblRoleList;
  let fixture: ComponentFixture<TblRoleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblRoleList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblRoleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
