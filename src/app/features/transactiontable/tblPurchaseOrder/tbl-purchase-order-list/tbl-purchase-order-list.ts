import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TblPurchaseOrder } from '../models/tblPurchaseOrder.model';
import { TblPurchaseOrderService } from '../services/tbl-purchase-order';


@Component({
  selector: 'app-tbl-purchase-order-list',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './tbl-purchase-order-list.html',
  styleUrl: './tbl-purchase-order-list.css',
})

export class TblPurchaseOrderListComponent implements OnInit {
  tblPurchaseOrder$?: Observable<TblPurchaseOrder[]>;
  actionType: string = '';
  submitAction: 'Load All' | 'Active Only' = 'Load All'; // default to Load All

  constructor(private tblPurchaseOrderService: TblPurchaseOrderService) {
  }
  ngOnInit(): void {
    this.actionType = 'Load All';
    this.tblPurchaseOrder$ = this.tblPurchaseOrderService.getAllTblPurchaseOrders();
  }
  OnFormSubmit(action: string): void {
    if (action === 'Load All') {
      this.actionType = "Load All";
      this.tblPurchaseOrder$ = this.tblPurchaseOrderService.getAllTblPurchaseOrders();
    }
    else {
      this.actionType = "Active Only";
      this.tblPurchaseOrder$ = this.tblPurchaseOrderService.getActiveTblPurchaseOrders();
    }
  }
}
