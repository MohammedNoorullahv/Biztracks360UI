import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TblUserDetail } from '../models/tblUserDetail.model';
import { TblUserDetailService } from '../services/tbl-user-detail';

@Component({
  selector: 'app-tbl-user-detail-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-user-detail-list.html',
  styleUrl: './tbl-user-detail-list.css',
})

export class TblUserDetailListComponent implements OnInit {
  paramSubscription?: Subscription;
  tblUserDetail$?: Observable<TblUserDetail[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All
  fldFKUser: number | null = null;
  // tblUserHeader?: TblUserHeaderUpdate;

  constructor(private tblUserDetailService: TblUserDetailService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams
    ]).subscribe(([params, queryParams]) => {

      const idParam = params.get('fldFKUser');

      this.fldFKUser = idParam
        ? parseInt(idParam, 10)
        : null;

      this.actionType = queryParams['action'];

      if (this.fldFKUser !== null) {

        this.actionType = 'Load All';

        this.tblUserDetail$ =
          this.tblUserDetailService
            .getAllTblUserDetails(this.fldFKUser);
      }
    });
  }

  OnFormSubmit(action: string): void {

  if (this.fldFKUser === null) {
    return;
  }

  if (action === 'Load All') {

    this.actionType = 'Load All';

    this.tblUserDetail$ =
      this.tblUserDetailService
        .getAllTblUserDetails(this.fldFKUser);

  }
  else {

    this.actionType = 'Active Only';

    this.tblUserDetail$ =
      this.tblUserDetailService
        .getActiveTblUserDetails(this.fldFKUser);
  }
}

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }
}

