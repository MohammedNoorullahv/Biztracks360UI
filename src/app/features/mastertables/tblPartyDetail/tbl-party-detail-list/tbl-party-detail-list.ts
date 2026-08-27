import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblPartyDetail } from '../models/tblPartyDetail.model';
import { TblPartyDetailService } from '../services/tbl-party-detail';

@Component({
  selector: 'app-tbl-party-detail-list',
  imports: [ CommonModule],
  templateUrl: './tbl-party-detail-list.html',
  styleUrl: './tbl-party-detail-list.css',
})



export class TblPartyDetailListComponent implements OnInit {
  tblPartyDetail$?: Observable<TblPartyDetail[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblPartyDetailService: TblPartyDetailService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblPartyDetail$ = this.tblPartyDetailService.getAllTblPartyDetails();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblPartyDetail$ = this.tblPartyDetailService.getAllTblPartyDetails();
    }
    else {
      this.actionType = "Active Only";
      this.tblPartyDetail$ = this.tblPartyDetailService.getActiveTblPartyDetails();
    }
  }
}

