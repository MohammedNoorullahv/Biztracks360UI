import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblPartyMaster } from '../models/tblPartyMaster.model';
import { TblPartyMasterService } from '../services/tbl-party-master';


@Component({
  selector: 'app-tbl-party-master-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-party-master-list.html',
  styleUrl: './tbl-party-master-list.css',
})

export class TblPartyMasterListComponent implements OnInit {
  tblPartyMaster$?: Observable<TblPartyMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblPartyMasterService: TblPartyMasterService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblPartyMaster$ = this.tblPartyMasterService.getAllTblPartyMasters();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblPartyMaster$ = this.tblPartyMasterService.getAllTblPartyMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblPartyMaster$ = this.tblPartyMasterService.getActiveTblPartyMasters();
    }
  }
}

