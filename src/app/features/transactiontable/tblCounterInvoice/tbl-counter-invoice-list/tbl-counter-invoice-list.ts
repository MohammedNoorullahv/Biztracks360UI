import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TblCounterInvoice } from '../models/tblCounterInvoice.model';
import { TblCounterInvoiceService } from '../services/tbl-counter-invoice';
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-tbl-counter-invoice-list',
  imports: [AsyncPipe, CommonModule, RouterLink, FormsModule],
  templateUrl: './tbl-counter-invoice-list.html',
  styleUrl: './tbl-counter-invoice-list.css',
})

export class TblCounterInvoiceListComponent implements OnInit {
  tblCounterInvoice$?: Observable<TblCounterInvoice[]>;
  actionType: string = "";
  submitAction: "Load All" | "Active Only" = "Load All"; // default to Load All
  fldFromDate = "";
  fldToDate = "";
  currentDate = "";
  @ViewChild("form") form!: NgForm;

  constructor(
    private tblCounterInvoiceService: TblCounterInvoiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  isNewStatus(purchaseOrder: TblCounterInvoice): boolean {
    const status =
      (purchaseOrder as any)?.tblPropertyStatusId?.fldDescription ??
      (purchaseOrder as any)?.tblPropertyStatus?.fldDescription ??
      "";
    return status.toString().trim().toLowerCase() === "new";
  }

  getStatusDescription(purchaseOrder: TblCounterInvoice): string {
    return (
      (purchaseOrder as any)?.tblPropertyStatusId?.fldDescription ??
      (purchaseOrder as any)?.tblPropertyStatus?.fldDescription ??
      (purchaseOrder as any)?.fldFKStatus ??
      ""
    );
  }

  requestDeleteOrCancel(
    purchaseOrder: TblCounterInvoice,
    _allRows: TblCounterInvoice[],
  ): void {
    const action: "Delete" | "Cancel" = this.isNewStatus(purchaseOrder)
      ? "Delete"
      : "Cancel";
    const unitId =
      Number((purchaseOrder as any).fldFKUnitId) ||
      Number((purchaseOrder as any).tblUnitMasterId?.fldId);

    // this.tblCounterInvoiceService.getLastTblPurchaeOrder(unitId).subscribe({
    //   next: (
    //     response: TblCounterInvoice | TblCounterInvoice[] | null | undefined,
    //   ) => {
    //     const lastRecord = Array.isArray(response) ? response[0] : response;
    //     const isLastRecord =
    //       Number((purchaseOrder as any).fldId) ===
    //       Number((lastRecord as any)?.fldId);
    //     this.confirmDeleteOrCancel(purchaseOrder, action, isLastRecord);
    //   },
    //   error: () => this.confirmDeleteOrCancel(purchaseOrder, action, false),
    // });

  }

  private confirmDeleteOrCancel(
    purchaseOrder: TblCounterInvoice,
    action: "Delete" | "Cancel",
    isLastRecord: boolean,
  ): void {
    const effect = isLastRecord
      ? "This is the last purchase order in the current sequence and will be permanently deleted."
      : `This purchase order will not be removed; its status will be changed to ${action === "Delete" ? "Deleted" : "Cancelled"}.`;

    if (!window.confirm(`${action} Counter Invoice?\n\n${effect}`)) {
      return;
    }

    if (
      !window.confirm(
        `Final acknowledgement: Do you want to continue with ${action.toLowerCase()}?`,
      )
    ) {
      return;
    }

    this.router.navigate(
      [
        "/transactiontables/tblCounterInvoice/Edit",
        (purchaseOrder as any).fldId,
      ],
      { queryParams: { action, permanent: isLastRecord } },
    );
  }

  ngOnInit(): void {
    const today = new Date();

    // Maximum selectable date
    this.currentDate = this.toInputDate(today);

    // From Date defaults to 7 days before today
    const oneWeekEarlier = new Date(today);
    oneWeekEarlier.setDate(today.getDate() - 7);

    const defaultFromDate = this.toInputDate(oneWeekEarlier);
    const requestedFromDate = this.route.snapshot.queryParamMap.get("fromDate");
    const requestedToDate = this.route.snapshot.queryParamMap.get("toDate");

    this.fldFromDate = this.isValidFilterDate(requestedFromDate)
      ? requestedFromDate
      : defaultFromDate;
    this.fldToDate = this.isValidFilterDate(requestedToDate)
      ? requestedToDate
      : this.currentDate;

    if (this.fldFromDate > this.fldToDate) {
      this.fldFromDate = defaultFromDate;
      this.fldToDate = this.currentDate;
    }

    console.log(
      "Init : FldFromDate, FldDtoDate",
      this.fldFromDate,
      this.fldToDate,
    );
    // this.actionType = 'Load All';
    this.tblCounterInvoice$ =
      this.tblCounterInvoiceService.getAllTblCounterInvoices(
        this.fldFromDate,
        this.fldToDate,
      );
  }

  private toInputDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  private isValidFilterDate(value: string | null): value is string {
    return (
      !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && value <= this.currentDate
    );
  }

  onFromDateChange(): void {
    // Prevent From Date from exceeding To Date
    // if (this.fldToDate && this.fldFromDate > this.fldToDate) {
    //   this.fldToDate = this.fldFromDate;
    // }

    if (this.fldToDate < this.fldFromDate) {
      this.fldToDate = this.fldFromDate;
    }
  }

  // refreshPurchaseOrders(): void {
  //   this.loadPurchaseOrders();
  // }

  OnFormSubmit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { fromDate: this.fldFromDate, toDate: this.fldToDate },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });

    this.tblCounterInvoice$ =
      this.tblCounterInvoiceService.getAllTblCounterInvoices(
        this.fldFromDate,
        this.fldToDate,
      );
  }
}

