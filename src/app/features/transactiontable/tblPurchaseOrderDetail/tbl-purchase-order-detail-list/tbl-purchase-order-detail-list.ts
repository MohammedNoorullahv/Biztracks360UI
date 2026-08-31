import { Component, OnInit } from "@angular/core";

import { combineLatest, Observable, Subscription } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { CommonModule, AsyncPipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";

import { TblPurchaseOrderDetail } from "../models/tblPurchaseOrderDetail.model";
import { TblPurchaseOrderDetailService } from "../services/tbl-purchase-order-detail";

@Component({
  selector: "app-tbl-purchase-order-detail-list",
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: "./tbl-purchase-order-detail-list.html",
  styleUrl: "./tbl-purchase-order-detail-list.css",
})
export class TblPurchaseOrderDetailListComponent implements OnInit {
  tblPurchaseOrderDetail$?: Observable<TblPurchaseOrderDetail[]>;
  actionType: string = "";
  submitAction: "Load All" | "Active Only" = "Load All"; // default to Load All
  fldFKPo: number | null = null;
  paramSubscription?: Subscription;

  // 1. Declare properties to bind onto the template header bar
  poHeaderInfo = {
    unitName: "",
    poNo: "",
    poDate: "",
    supplierName: "",
    totalValue: 0,
    dlyDate: "",
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
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams,
    ]).subscribe(([params, queryParams]) => {
      const idParam = params.get("fldFKPo");

      this.fldFKPo = idParam ? parseInt(idParam, 10) : null;

      // 2. Map incoming query string values to your local UI template variables
      this.poHeaderInfo = {
        unitName: queryParams["unitName"] || "",
        poNo: queryParams["poNo"] || "",
        poDate: queryParams["poDate"] || "",
        supplierName: queryParams["supplierName"] || "",
        totalValue: this.toNumber(queryParams["totalValue"]),
        dlyDate: queryParams["dlyDate"] || "",
        totalQty: this.toNumber(queryParams["totalQty"]),
        inwardQty: this.toNumber(queryParams["inwardQty"]),
        cancelQty: this.toNumber(queryParams["cancelQty"]),
        balanceQty: this.toNumber(queryParams["balanceQty"]),
        itemsGrossValue: this.toNumber(queryParams["itemsGrossValue"]),
        itemsTaxableValue: this.toNumber(queryParams["itemsTaxableValue"]),
        itemsGSTValue: this.toNumber(queryParams["itemsGSTValue"]),
        itemsTotalValue: this.toNumber(queryParams["itemsTotalValue"]),
        discountPercentage: this.toNumber(queryParams["discountPercentage"]),
        discountValue: this.toNumber(queryParams["discountValue"]),
        grandGrossValue: this.toNumber(queryParams["grandGrossValue"]),
        otherPlusValue: this.toNumber(queryParams["otherPlusValue"]),
        otherMinusValue: this.toNumber(queryParams["otherMinusValue"]),
        roundoff: this.toNumber(queryParams["roundoff"]),
        grandTotalValue: this.toNumber(queryParams["grandTotalValue"]),
      };

      console.log("Purchase Order Id: ", this.poHeaderInfo.poNo);
      this.loadDetails(false);
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

    this.tblPurchaseOrderDetail$ = request.pipe(
      tap((rows) => this.refreshHeaderTotals(rows ?? [])),
      shareReplay(1),
    );
  }

  private refreshHeaderTotals(rows: TblPurchaseOrderDetail[]): void {
    this.poHeaderInfo.totalQty = this.sum(rows, "fldQuantity");
    this.poHeaderInfo.inwardQty = this.sum(rows, "fldInwardQuantity");
    this.poHeaderInfo.cancelQty = this.sum(rows, "fldCancelQuantity");
    this.poHeaderInfo.balanceQty =
      this.poHeaderInfo.totalQty -
      this.poHeaderInfo.inwardQty -
      this.poHeaderInfo.cancelQty;
    this.poHeaderInfo.itemsGrossValue = this.sum(rows, "fldGrossValue");
    this.poHeaderInfo.itemsTaxableValue = this.sum(rows, "fldTaxableValue");
    this.poHeaderInfo.itemsGSTValue = this.sum(rows, "fldGSTValue");
    this.poHeaderInfo.itemsTotalValue = this.sum(rows, "fldTotalValue");
    this.poHeaderInfo.grandGrossValue =
      this.poHeaderInfo.itemsTotalValue - this.poHeaderInfo.discountValue;
    this.poHeaderInfo.grandTotalValue = Number(
      (
        this.poHeaderInfo.grandGrossValue +
        this.poHeaderInfo.otherPlusValue -
        this.poHeaderInfo.otherMinusValue +
        this.poHeaderInfo.roundoff
      ).toFixed(2),
    );
    this.poHeaderInfo.totalValue = this.poHeaderInfo.grandTotalValue;
  }

  private sum(rows: TblPurchaseOrderDetail[], field: string): number {
    return Number(
      rows
        .reduce((total, row) => total + this.toNumber((row as any)[field]), 0)
        .toFixed(2),
    );
  }

  private toNumber(value: unknown): number {
    return Number(value) || 0;
  }

  getDetailQueryParams(action: "Edit" | "Delete"): any {
    return { ...this.poHeaderInfo, action };
  }
}
