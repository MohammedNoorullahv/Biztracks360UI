import { Component, OnDestroy, OnInit } from "@angular/core";

import { combineLatest, Observable, Subscription } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { CommonModule, AsyncPipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";

import { TblCounterInvoiceDetail } from "../models/tblCounterInvoiceDetail.model";
import { TblCounterInvoiceDetailService } from "../services/tbl-counter-invoice-detail";
import { TblCounterInvoice } from "../../tblCounterInvoice/models/tblCounterInvoice.model";
import { TblCounterInvoiceService } from "../../tblCounterInvoice/services/tbl-counter-invoice";

@Component({
  selector: "app-tbl-counter-invoice-detail-list",
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: "./tbl-counter-invoice-detail.html",
  styleUrl: "./tbl-counter-invoice-detail.css",
})
export class TblCounterInvoiceDetailListComponent implements OnInit, OnDestroy {
  tblCounterInvoiceDetail$?: Observable<TblCounterInvoiceDetail[]>;
  actionType: string = "";
  submitAction: "Load All" | "Active Only" = "Load All"; // default to Load All
  fldFKInv: number | null = null;
  paramSubscription?: Subscription;
  private headerLoadSubscription?: Subscription;

  // 1. Declare properties to bind onto the template header bar
  poHeaderInfo = {
    unitName: "",
    poNo: "",
    poDate: new Date(),
    supplierName: "",
    companyStateCode: "",
    supplierStateCode: "",
    fromDate: "",
    toDate: "",
    totalValue: 0,
    dlyDate: new Date(),
    totalQty: 0,
    inwardQty: 0,
    cancelQty: 0,
    balanceQty: 0,
    itemsGrossValue: 0,
    itemsTaxableValue: 0,
    itemsGSTValue: 0,
    itemsTotalValue: 0,
    discountPercentage: 0,
    discountValue: 0,
    grandGrossValue: 0,
    otherPlusValue: 0,
    otherMinusValue: 0,
    roundoff: 0,
    grandTotalValue: 0,
  };

  constructor(
    private tblCounterInvoiceDetailService: TblCounterInvoiceDetailService,
    private tblCounterInvoiceService: TblCounterInvoiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log("TblCounterInvoiceDetailListComponent initialized.");
    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams,
    ]).subscribe(([params, queryParams]) => {
      const idParam = params.get("fldFKInv");

      this.fldFKInv = idParam ? parseInt(idParam, 10) : null;

      this.poHeaderInfo.fromDate = queryParams["fromDate"] || "";
      this.poHeaderInfo.toDate = queryParams["toDate"] || "";
      console.log("Query Params - fromDate:", this.poHeaderInfo.fromDate, "toDate:", this.poHeaderInfo.toDate);
      if (this.fldFKInv) {
        console.log("01. Loading details for Counter Invoice ID:", this.fldFKInv);
        this.loadPurchaseOrderHeader();

        this.loadDetails(false);
      }
    });
  }

  OnFormSubmit(action: string): void {
    if (action === "Load All") {
      this.actionType = "Load All";
      this.loadDetails(false);
    } else {
      this.actionType = "Active Only";
      this.loadDetails(true);
    }
  }

  private loadDetails(activeOnly: boolean): void {
    const request = activeOnly
      ? this.tblCounterInvoiceDetailService.getActiveTblCounterInvoiceDetails(
          this.fldFKInv ?? 0,
        )
      : this.tblCounterInvoiceDetailService.getAllTblCounterInvoiceDetails(
          this.fldFKInv ?? 0,
        );

    this.tblCounterInvoiceDetail$ = request.pipe(shareReplay(1));
  }

  private loadPurchaseOrderHeader(): void {
    console.log("02. Loading Counter Invoice header for ID:", this.fldFKInv);
    if (!this.fldFKInv) return;

    this.headerLoadSubscription?.unsubscribe();
    this.headerLoadSubscription = this.tblCounterInvoiceService
      .getTblCounterInvoiceById(this.fldFKInv)
      .subscribe({
        next: (purchaseOrder) => this.assignPurchaseOrderHeader(purchaseOrder),
        error: (err) => console.error("Counter Invoice API error:", err),
      });
  }

  private assignPurchaseOrderHeader(purchaseOrder: TblCounterInvoice): void {
    console.log("03. Assigning Counter Invoice header:", purchaseOrder);
    this.poHeaderInfo = {
      ...this.poHeaderInfo,
      unitName: purchaseOrder.tblUnitMasterId?.fldName ?? "",
      supplierName: purchaseOrder.tblPartyDetailId?.fldName ?? "",
      companyStateCode: purchaseOrder.tblUnitMasterId?.fldStateCode ?? "",
      supplierStateCode: purchaseOrder.tblPartyDetailId?.fldStateCode ?? "",
      poNo: purchaseOrder.fldInvNo ?? "",
      poDate: purchaseOrder.fldInvDate ?? "",
      dlyDate: purchaseOrder.fldDeliveryStartDate ?? "",
      totalQty: this.toNumber(purchaseOrder.fldTotalQty),
      inwardQty: this.toNumber(purchaseOrder.fldInwardQty),
      cancelQty: this.toNumber(purchaseOrder.fldCancelQty),
      balanceQty: this.toNumber(purchaseOrder.fldBalanceQty),
      itemsGrossValue: this.toNumber(purchaseOrder.fldItemsGrossValue),
      itemsTaxableValue: this.toNumber(purchaseOrder.fldItemsTaxableValue),
      itemsGSTValue: this.toNumber(purchaseOrder.fldItemsGSTValue),
      itemsTotalValue: this.toNumber(purchaseOrder.fldItemsTotalValue),
      discountPercentage: this.toNumber(purchaseOrder.fldDiscountPercentage),
      discountValue: this.toNumber(purchaseOrder.fldDiscountValue),
      grandGrossValue: this.toNumber(purchaseOrder.fldGrandGrossValue),
      otherPlusValue: this.toNumber(purchaseOrder.fldOtherPlusValue),
      otherMinusValue: this.toNumber(purchaseOrder.fldOtherMinusValue),
      roundoff: this.toNumber(purchaseOrder.fldRoundoff),
      grandTotalValue: this.toNumber(purchaseOrder.fldGrandTotalValue),
      totalValue: this.toNumber(purchaseOrder.fldGrandTotalValue),
    };
  }

  private toNumber(value: unknown): number {
    return Number(value) || 0;
  }

  getDetailQueryParams(action: "Edit" | "Delete"): any {
    return {
      action,
      fldFKInv: this.fldFKInv,
      fromDate: this.poHeaderInfo.fromDate,
      toDate: this.poHeaderInfo.toDate,
    };
  }

  getAddQueryParams(): any {
    return {
      fldFKInv: this.fldFKInv,
      fromDate: this.poHeaderInfo.fromDate,
      toDate: this.poHeaderInfo.toDate,
    };
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.headerLoadSubscription?.unsubscribe();
  }
}
