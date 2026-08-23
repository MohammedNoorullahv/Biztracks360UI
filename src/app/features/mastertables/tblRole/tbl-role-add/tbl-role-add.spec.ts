import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblRoleAdd } from './tbl-role-add';

describe('TblRoleAdd', () => {
  let component: TblRoleAdd;
  let fixture: ComponentFixture<TblRoleAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblRoleAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblRoleAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
