import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblUserHeader } from '../models/tblUserHeader.model';
import { TblUserHeaderService } from '../services/tbl-user-header';


@Component({
  selector: 'app-tbl-user-header-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-user-header-list.html',
  styleUrl: './tbl-user-header-list.css',
})

export class TblUserHeaderListComponent implements OnInit {
  tblUserHeader$?: Observable<TblUserHeader[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblUserHeaderService: TblUserHeaderService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblUserHeader$ = this.tblUserHeaderService.getAllTblUserHeaders();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblUserHeader$ = this.tblUserHeaderService.getAllTblUserHeaders();
    }
    else {
      this.actionType = "Active Only";
      this.tblUserHeader$ = this.tblUserHeaderService.getActiveTblUserHeaders();
    }
  }
}
