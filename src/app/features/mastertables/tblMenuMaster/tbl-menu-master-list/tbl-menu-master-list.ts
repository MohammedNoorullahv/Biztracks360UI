import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblMenuMasterService } from '../services/tbl-menu-master';
import { TblMenuMaster } from '../models/tblMenuMaster.model';


@Component({
  selector: 'app-tbl-menu-master-list',
  imports: [
    AsyncPipe, CommonModule, RouterLink
  ],
  templateUrl: './tbl-menu-master-list.html',
  styleUrl: './tbl-menu-master-list.css',
})

export class TblMenuMasterListComponent implements OnInit {
  tblMenuMaster$?: Observable<TblMenuMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblMenuMasterService: TblMenuMasterService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblMenuMaster$ = this.tblMenuMasterService.getAllTblMenuMasters();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblMenuMaster$ = this.tblMenuMasterService.getAllTblMenuMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblMenuMaster$ = this.tblMenuMasterService.getActiveTblMenuMasters();
    }
  }
}

