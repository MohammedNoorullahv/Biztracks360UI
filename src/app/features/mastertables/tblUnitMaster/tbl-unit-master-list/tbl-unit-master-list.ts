import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblUnitMaster } from '../models/tblUnitMaster.model';
import { TblUnitMasterService } from '../services/tbl-unit-master';


@Component({
  selector: 'app-tbl-unit-master-list',
  imports: [AsyncPipe, CommonModule, RouterLink
  ],
  templateUrl: './tbl-unit-master-list.html',
  styleUrl: './tbl-unit-master-list.css',
})

export class TblUnitMasterListComponent implements OnInit {
  tblUnitMaster$?: Observable<TblUnitMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblUnitMasterService: TblUnitMasterService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblUnitMaster$ = this.tblUnitMasterService.getAllTblUnitMasters();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblUnitMaster$ = this.tblUnitMasterService.getAllTblUnitMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblUnitMaster$ = this.tblUnitMasterService.getActiveTblUnitMasters();
    }
  }
}

