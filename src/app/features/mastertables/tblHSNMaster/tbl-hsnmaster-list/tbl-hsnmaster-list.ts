import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TblHSNMaster } from '../models/tblHSNMaster.model';
import { TblHSNMasterService } from '../services/tbl-hsnmaster';


@Component({
  selector: 'app-tbl-hsnmaster-list',
  imports: [
    AsyncPipe, CommonModule, RouterLink
  ],
  templateUrl: './tbl-hsnmaster-list.html',
  styleUrl: './tbl-hsnmaster-list.css',
})

export class TblHSNMasterListComponent implements OnInit {
  tblHSNMaster$?: Observable<TblHSNMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblHSNMasterService: TblHSNMasterService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblHSNMaster$ = this.tblHSNMasterService.getAllTblHSNMasters();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblHSNMaster$ = this.tblHSNMasterService.getAllTblHSNMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblHSNMaster$ = this.tblHSNMasterService.getActiveTblHSNMasters();
    }
  }
}

