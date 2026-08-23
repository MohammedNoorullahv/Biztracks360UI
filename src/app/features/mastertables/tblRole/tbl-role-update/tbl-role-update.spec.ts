import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblRoleUpdate } from './tbl-role-update';

describe('TblRoleUpdate', () => {
  let component: TblRoleUpdate;
  let fixture: ComponentFixture<TblRoleUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblRoleUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblRoleUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
