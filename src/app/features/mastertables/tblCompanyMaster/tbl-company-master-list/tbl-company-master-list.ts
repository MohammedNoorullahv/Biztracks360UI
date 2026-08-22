import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblCompanyMaster } from '../models/tblCompanyMaster.model';
import { TblCompanyMasterService } from '../services/tbl-company-master';


@Component({
  selector: 'app-tbl-company-master-list',
  imports: [
    AsyncPipe, CommonModule, RouterLink
  ],
  templateUrl: './tbl-company-master-list.html',
  styleUrl: './tbl-company-master-list.css',
})

export class TblCompanyMasterListComponent implements OnInit {
  tblCompanyMaster$?: Observable<TblCompanyMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblCompanyMasterService: TblCompanyMasterService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblCompanyMaster$ = this.tblCompanyMasterService.getAllTblCompanyMasters();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblCompanyMaster$ = this.tblCompanyMasterService.getAllTblCompanyMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveTblCompanyMasters();
    }
  }
}

