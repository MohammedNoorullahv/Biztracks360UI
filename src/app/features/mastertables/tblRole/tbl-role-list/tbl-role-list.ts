import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblRole } from '../models/tblRole.model';
import { TblRoleService } from '../services/tbl-role';

@Component({
  selector: 'app-tbl-role-list',
  imports: [AsyncPipe, CommonModule, RouterLink
  ],
  templateUrl: './tbl-role-list.html',
  styleUrl: './tbl-role-list.css',
})

export class TblRoleListComponent implements OnInit {
  tblRole$?: Observable<TblRole[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblRoleService: TblRoleService) {
  }
  ngOnInit(): void {
    
    this.actionType = 'Load All';
    this.tblRole$ = this.tblRoleService.getAllTblRoles();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblRole$ = this.tblRoleService.getAllTblRoles();
    }
    else {
      this.actionType = "Active Only";
      this.tblRole$ = this.tblRoleService.getActiveTblRoles();
    }
  }
}

