import { Component, OnDestroy, OnInit } from "@angular/core";

import { combineLatest, Observable, Subscription } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { CommonModule, AsyncPipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";

import { TblPurchaseOrderDetail } from "../models/tblPurchaseOrderDetail.model";
import { TblPurchaseOrderDetailService } from "../services/tbl-purchase-order-detail";
import { TblPurchaseOrder } from "../../tblPurchaseOrder/models/tblPurchaseOrder.model";
import { TblPurchaseOrderService } from "../../tblPurchaseOrder/services/tbl-purchase-order";

@Component({
  selector: "app-tbl-purchase-order-detail-list",
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: "./tbl-purchase-order-detail-list.html",
  styleUrl: "./tbl-purchase-order-detail-list.css",
})
export class TblPurchaseOrderDetailListComponent implements OnInit, OnDestroy {
  tblPurchaseOrderDetail$?: Observable<TblPurchaseOrderDetail[]>;
  actionType: string = "";
  submitAction: "Load All" | "Active Only" = "Load All"; // default to Load All
  fldFKPo: number | null = null;
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
    private tblPurchaseOrderDetailService: TblPurchaseOrderDetailService,
    private tblPurchaseOrderService: TblPurchaseOrderService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams,
    ]).subscribe(([params, queryParams]) => {
      const idParam = params.get("fldFKPo");

      this.fldFKPo = idParam ? parseInt(idParam, 10) : null;

      this.poHeaderInfo.fromDate = queryParams["fromDate"] || "";
      this.poHeaderInfo.toDate = queryParams["toDate"] || "";

      if (this.fldFKPo) {
        console.log("01. Loading details for Purchase Order ID:", this.fldFKPo);
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
      ? this.tblPurchaseOrderDetailService.getActiveTblPurchaseOrderDetails(
          this.fldFKPo ?? 0,
        )
      : this.tblPurchaseOrderDetailService.getAllTblPurchaseOrderDetails(
          this.fldFKPo ?? 0,
        );

    this.tblPurchaseOrderDetail$ = request.pipe(shareReplay(1));
  }

  private loadPurchaseOrderHeader(): void {
    console.log("02. Loading Purchase Order header for ID:", this.fldFKPo);
    if (!this.fldFKPo) return;

    this.headerLoadSubscription?.unsubscribe();
    this.headerLoadSubscription = this.tblPurchaseOrderService
      .getTblPurchaseOrderById(this.fldFKPo)
      .subscribe({
        next: (purchaseOrder) => this.assignPurchaseOrderHeader(purchaseOrder),
        error: (err) => console.error("Purchase Order API error:", err),
      });
  }

  private assignPurchaseOrderHeader(purchaseOrder: TblPurchaseOrder): void {
    console.log("03. Assigning Purchase Order header:", purchaseOrder);
    this.poHeaderInfo = {
      ...this.poHeaderInfo,
      unitName: purchaseOrder.tblUnitMasterId?.fldName ?? "",
      supplierName: purchaseOrder.tblPartyDetailId?.fldName ?? "",
      companyStateCode: purchaseOrder.tblUnitMasterId?.fldStateCode ?? "",
      supplierStateCode: purchaseOrder.tblPartyDetailId?.fldStateCode ?? "",
      poNo: purchaseOrder.fldPONo ?? "",
      poDate: purchaseOrder.fldPODate ?? "",
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
      fldFKPo: this.fldFKPo,
      fromDate: this.poHeaderInfo.fromDate,
      toDate: this.poHeaderInfo.toDate,
    };
  }

  getAddQueryParams(): any {
    return {
      fldFKPo: this.fldFKPo,
      fromDate: this.poHeaderInfo.fromDate,
      toDate: this.poHeaderInfo.toDate,
    };
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.headerLoadSubscription?.unsubscribe();
  }
}
