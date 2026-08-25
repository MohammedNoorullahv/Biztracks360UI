import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUserHeaderAdd } from './tbl-user-header-add';

describe('TblUserHeaderAdd', () => {
  let component: TblUserHeaderAdd;
  let fixture: ComponentFixture<TblUserHeaderAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUserHeaderAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUserHeaderAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
