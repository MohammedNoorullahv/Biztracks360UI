import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from "@angular/forms";

import { TblSaleInvoice } from '../models/tblSaleInvoice.model';
import { TblSaleInvoiceService } from '../services/tbl-sale-invoice-service';
// import { TblSaleInvoiceService } from '../services/tbl-sale-invoice';


@Component({
  selector: 'app-tbl-sale-invoice-component-list',
  imports: [AsyncPipe, CommonModule, RouterLink, FormsModule],
  templateUrl: './tbl-sale-invoice-component-list.html',
  styleUrl: './tbl-sale-invoice-component-list.css',
})

export class TblSaleInvoiceListComponent implements OnInit {
  tblSaleInvoice$?: Observable<TblSaleInvoice[]>;
  actionType: string = '';
  fldFromDate = "";
  fldToDate = "";
  currentDate = "";
  @ViewChild("form") form!: NgForm;

  constructor(
    private tblSaleInvoiceService: TblSaleInvoiceService,
    private router: Router, private route: ActivatedRoute
  ) { }

  isNewStatus(saleInvoices: TblSaleInvoice): boolean {
    const status =
      (saleInvoices as any)?.tblPropertyStatusId?.fldDescription ??
      (saleInvoices as any)?.tblPropertyStatus?.fldDescription ??
      "";
    return status.toString().trim().toLowerCase() === "new";
  }

  getStatusDescription(saleInvoices: TblSaleInvoice): string {
    return (
      (saleInvoices as any)?.tblPropertyStatusId?.fldDescription ??
      (saleInvoices as any)?.tblPropertyStatus?.fldDescription ??
      (saleInvoices as any)?.fldFKStatus ??
      ""
    );
  }

  requestDeleteOrCancel(saleInvoices: TblSaleInvoice, _allRows: TblSaleInvoice[]): void {
    const action: "Delete" | "Cancel" = this.isNewStatus(saleInvoices)
      ? "Delete" : "Cancel";
    const unitId =
      Number((saleInvoices as any).fldFKUnitId) ||
      Number((saleInvoices as any).tblUnitMasterId?.fldId);

    this.tblSaleInvoiceService.getLastTblSaleInvoice(unitId).subscribe({
      next: (
        response: TblSaleInvoice | TblSaleInvoice[] | null | undefined,
      ) => {
        const lastRecord = Array.isArray(response) ? response[0] : response;
        const isLastRecord =
          Number((saleInvoices as any).fldId) ===
          Number((lastRecord as any)?.fldId);
        this.confirmDeleteOrCancel(saleInvoices, action, isLastRecord);
      },
      error: () => this.confirmDeleteOrCancel(saleInvoices, action, false),
    });
  }

  private confirmDeleteOrCancel(saleInvoices: TblSaleInvoice, action: "Delete" | "Cancel",
    isLastRecord: boolean): void {
    const effect = isLastRecord
      ? "This is the last Sale Invoicesin the current sequence and will be permanently deleted."
      : `This Sale Invoices will not be removed; its status will be changed to ${action === "Delete" ? "Deleted" : "Cancelled"}.`;

    if (!window.confirm(`${action} Sale Invoices?

${effect}`)) {
      return;
    }

    if (
      !window.confirm(`Final acknowledgement: Do you want to continue with ${action.toLowerCase()}?`,)
    ) {
      return;
    }

    this.router.navigate(
      [
        "/transactionTables/tblSaleInvoice/Edit",
        (saleInvoices as any).fldId,
      ],
      { queryParams: { action, permanent: isLastRecord } },
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
    if (this.fldToDate < this.fldFromDate) {
      this.fldToDate = this.fldFromDate;
    }

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
      ? requestedFromDate : defaultFromDate;
    this.fldToDate = this.isValidFilterDate(requestedToDate)
      ? requestedToDate : this.currentDate;

    if (this.fldFromDate > this.fldToDate) {
      this.fldFromDate = defaultFromDate;
      this.fldToDate = this.currentDate;
    }

    this.tblSaleInvoice$ =
      this.tblSaleInvoiceService.getAllTblSaleInvoices(
        this.fldFromDate,
        this.fldToDate,
      );

  }
  OnFormSubmit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { fromDate: this.fldFromDate, toDate: this.fldToDate },
      queryParamsHandling: "merge",
      replaceUrl: true,
    });

    this.tblSaleInvoice$ = this.tblSaleInvoiceService.getAllTblSaleInvoices(
      this.fldFromDate,
      this.fldToDate,
    );
  }

}