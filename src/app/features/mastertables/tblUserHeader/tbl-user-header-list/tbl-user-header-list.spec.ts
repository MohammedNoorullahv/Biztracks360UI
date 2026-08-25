import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblUserHeaderList } from './tbl-user-header-list';

describe('TblUserHeaderList', () => {
  let component: TblUserHeaderList;
  let fixture: ComponentFixture<TblUserHeaderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblUserHeaderList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblUserHeaderList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
