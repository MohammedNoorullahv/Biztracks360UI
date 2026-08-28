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
  fldFromDate = '';
  fldToDate = '';
  currentDate = '';

  constructor(private tblPurchaseOrderService: TblPurchaseOrderService) {
  }

  ngOnInit(): void {

    const today = new Date();

    // Maximum selectable date
    this.currentDate = this.toInputDate(today);

    // To Date defaults to today
    this.fldToDate = this.currentDate;

    // From Date defaults to 7 days before today
    const oneWeekEarlier = new Date(today);
    oneWeekEarlier.setDate(today.getDate() - 7);

    this.fldFromDate = this.toInputDate(oneWeekEarlier);

    this.actionType = 'Load All';
    this.tblPurchaseOrder$ = this.tblPurchaseOrderService.getAllTblPurchaseOrders();
  }

  private toInputDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  onFromDateChange(): void {
    // Prevent From Date from exceeding To Date
    // if (this.fldToDate && this.fldFromDate > this.fldToDate) {
    //   this.fldToDate = this.fldFromDate;
    // }

    if (this.fldToDate < this.fldFromDate){
      this.fldToDate = this.fldFromDate;
    }
  }

  // refreshPurchaseOrders(): void {
  //   this.loadPurchaseOrders();
  // }


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
