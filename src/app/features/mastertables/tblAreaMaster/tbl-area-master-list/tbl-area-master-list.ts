import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TblAreaMaster } from '../models/tblAreaMaster.model';
import { TblAreaMasterService } from '../services/tbl-area-master';


@Component({
  selector: 'app-tbl-area-master-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-area-master-list.html',
  styleUrl: './tbl-area-master-list.css',
})

export class TblAreaMasterListComponent implements OnInit {
  tblAreaMaster$?: Observable<TblAreaMaster[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblAreaMasterService: TblAreaMasterService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblAreaMaster$ = this.tblAreaMasterService.getAllTblAreaMasters();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblAreaMaster$ = this.tblAreaMasterService.getAllTblAreaMasters();
    }
    else {
      this.actionType = "Active Only";
      this.tblAreaMaster$ = this.tblAreaMasterService.getActiveTblAreaMasters();
    }
  }
}

