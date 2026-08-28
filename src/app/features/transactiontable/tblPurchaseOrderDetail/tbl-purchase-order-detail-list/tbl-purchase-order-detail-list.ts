import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TblPurchaseOrderDetail } from '../models/tblPurchaseOrderDetail.model';
import { TblPurchaseOrderDetailService } from '../services/tbl-purchase-order-detail';


@Component({
  selector: 'app-tbl-purchase-order-detail-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-purchase-order-detail-list.html',
  styleUrl: './tbl-purchase-order-detail-list.css',
})

export class TblPurchaseOrderDetailListComponent implements OnInit {
  tblPurchaseOrderDetail$?: Observable<TblPurchaseOrderDetail[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All
  fldFKPo: number | null = null;
  paramSubscription?: Subscription;

  constructor(private tblPurchaseOrderDetailService: TblPurchaseOrderDetailService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams
    ]).subscribe(([params, queryParams]) => {

      const idParam = params.get('fldFKPo');

      this.fldFKPo = idParam
        ? parseInt(idParam, 10)
        : null;

        // this.tblUserDetail$ =
        //   this.tblUserDetailService
        //     .getAllTblUserDetails(this.fldFKUser);

      this.tblPurchaseOrderDetail$ = this.tblPurchaseOrderDetailService.getAllTblPurchaseOrderDetails(this.fldFKPo ?? 0);
    });
  }

  OnFormSubmit(action: string): void {
      if(action === 'Load All') {
      this.actionType = "Load All";
      this.tblPurchaseOrderDetail$ = this.tblPurchaseOrderDetailService.getAllTblPurchaseOrderDetails(this.fldFKPo ?? 0);
    }
    else {
      this.actionType = "Active Only";
      this.tblPurchaseOrderDetail$ = this.tblPurchaseOrderDetailService.getActiveTblPurchaseOrderDetails(this.fldFKPo ?? 0);
    }
  }
}

