import {
  Component,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

// import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
// import { TblProperty } from '../../tblProperty/models/tblProperty.model';
// import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from "../../../../shared/services/tbl-property-shared";

import { TblCounterInvoice } from "../../tblCounterInvoice/models/tblCounterInvoice.model";
import { TblCounterInvoiceService } from "../../tblCounterInvoice/services/tbl-counter-invoice";
// import { TblItemMaster } from '../../tblItemMaster/models/tblItemMaster.model';
// import { TblItemMasterService } from '../../tblItemMaster/services/tbl-item-master';
// import { TblHSNMaster } from '../../tblHSNMaster/models/tblHSNMaster.model';
// import { TblHSNMasterService } from '../../tblHSNMaster/services/tblhs-n-master';

import { TblCounterInvoiceDetail } from "../models/tblCounterInvoiceDetail.model";
import { TblCounterInvoiceDetailAdd } from "../models/tblCounterInvoiceDetail-Add.model";
import { TblCounterInvoiceDetailService } from "../services/tbl-counter-invoice-detail";
import { TblProperty } from "../../../mastertables/tblProperty/models/tblProperty.model";
import { TblItemMaster } from "../../../mastertables/tblItemMaster/models/tblItemMaster.model";
import { TblHSNMaster } from "../../../mastertables/tblHSNMaster/models/tblHSNMaster.model";
import { TblItemMasterService } from "../../../mastertables/tblItemMaster/services/tbl-item-master";
import { TblHSNMasterService } from "../../../mastertables/tblHSNMaster/services/tbl-hsnmaster";



@Component({
  selector: 'app-tbl-counter-invoice-detail-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-counter-invoice-detail-add.html',
  styleUrl: './tbl-counter-invoice-detail-add.css',
})

export class TblCounterInvoiceDetailAddComponent implements OnDestroy {
  model: TblCounterInvoiceDetailAdd;
  submitAction: "SaveAndAddNew" | "SaveAndClose" | "exit" = "exit"; // default to exit
  private addTblCounterInvoiceDetailSubscription?: Subscription;
  private itemMasterLoadSubscription?: Subscription;
  private headerLoadSubscription?: Subscription;
  @ViewChild("form") form!: NgForm;
  isSaving: boolean = false;
  fldFKInv: number | null = null;

  fldFKHsnCode: number | null = null;
  fldGSTPercentage: number | null = null;
  savedPurchaseOrderDetails: TblCounterInvoiceDetail[] = [];
  showItemSelectionGrid = true;
  itemMasters: TblItemMaster[] = [];
  isItemGridLoading = false;
  itemGridLoadFailed = false;
  // tblHSNMaster$?: Observable<TblHSNMaster>;

  poHeaderInfo: any = {
    unitName: "",
    supplierName: "",
    companyStateCode: "",
    supplierStateCode: "",
    fromDate: "",
    toDate: "",
    poNo: "",
    poDate: "",
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

  // tblPropertyAll$?: Observable<TblProperty[]>;

  // tblCounterInvoice$?: Observable<TblCounterInvoice[]>
  tblItemMaster$?: Observable<TblItemMaster[]>;
  // tblHSNMaster$?: Observable<TblHSNMaster[]>
  // tblPropertyStatus$?: Observable<TblProperty[]>;

  constructor(
    private tblCounterInvoiceDetailService: TblCounterInvoiceDetailService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblCounterInvoiceService: TblCounterInvoiceService,
    private tblItemMasterService: TblItemMasterService,
    private tblHSNMasterService: TblHSNMasterService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.model = {
      fldId: 0,
      fldFKInv: 0,
      fldFKItem: 0,
      fldItemDescription: "",
      fldItemSize: "",
      fldItemColour: "",
      fldFKPurchaseUOM: "",
      fldFKUsageUOM: "",
      fldFKHSNCode: 0,
      fldQuantity: 0,
      fldRate: 0,
      fldGrossValue: 0,
      fldDiscountPercentage: 0,
      fldDiscountValue: 0,
      fldTaxableValue: 0,
      fldIGSTPercentage: 0,
      fldIGSTValue: 0,
      fldSGSTPercentage: 0,
      fldSGSTValue: 0,
      fldCGSTPercentage: 0,
      fldCGSTValue: 0,
      fldGSTValue: 0,
      fldTotalValue: 0,
      fldDeliveryDate: new Date(),
      fldRemarks: "",
      fldFKStatus: 0,
      fldInwardQuantity: 0,
      fldCancelQuantity: 0,
      fldBalanceQuantity: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    const fldFKUserParam =
      this.route.snapshot.paramMap.get("fldFKInv") ??
      this.route.snapshot.queryParamMap.get("fldFKInv");

    if (fldFKUserParam) {
      this.fldFKInv = parseInt(fldFKUserParam, 10);

      this.model.fldFKInv = this.fldFKInv;
    }

    this.poHeaderInfo.fromDate =
      this.route.snapshot.queryParamMap.get("fromDate") ?? "";
    this.poHeaderInfo.toDate =
      this.route.snapshot.queryParamMap.get("toDate") ?? "";

    // this.tblPropertyStatus$ = this.tblPropertySharedService.getPropertiesByType('Status');

    // this.tblCounterInvoice$ = this.tblCounterInvoiceService.getActiveLeanTblCounterInvoices();
    this.loadItemSelectionGrid();
    this.loadPurchaseOrderHeader();
    // this.tblHSNMaster$ = this.tblHSNMasterService.getActiveLeanTblHSNMasters();

    setTimeout(() => {
      if (this.form && this.form.controls["fldDescription"]) {
        this.form.controls["fldDescription"].markAsTouched();
      }
    });
  }

  private loadPurchaseOrderHeader(): void {
    if (!this.fldFKInv) return;

    this.headerLoadSubscription?.unsubscribe();
    this.headerLoadSubscription = this.tblCounterInvoiceService
      .getTblCounterInvoiceById(this.fldFKInv)
      .subscribe({
        next: (purchaseOrder) => {
          this.assignPurchaseOrderHeader(purchaseOrder);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.toastr.error(
            err?.error?.message || "Unable to load Counter Invoice information.",
            "PO Load Failed",
            { toastClass: "ngx-toastr custom-toast error-toast" },
          );
        },
      });
  }

  private assignPurchaseOrderHeader(purchaseOrder: TblCounterInvoice): void {
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
    };
  }

  calculateItemValue(): void {
    // Reapply the GST split for every recalculation. This keeps Add and Edit
    // calculations consistent even when quantity, rate or discount changes.
    this.applyGstPercentages();

    const fldQuantity = Number(this.model.fldQuantity) || 0;
    const fldRate = Number(this.model.fldRate) || 0;
    const fldGrossValue = fldQuantity * fldRate;

    this.model.fldGrossValue = Number(Number(fldGrossValue).toFixed(2));

    const fldDiscountPercentage = Number(this.model.fldDiscountPercentage) || 0;
    if (fldDiscountPercentage > 0) {
      const fldDiscountValueDerived =
        (fldGrossValue * fldDiscountPercentage) / 100;
      this.model.fldDiscountValue = Number(fldDiscountValueDerived.toFixed(2));
    }

    const fldDiscountValue = Number(this.model.fldDiscountValue) || 0;
    const fldTaxableValue = Math.max(0, fldGrossValue - fldDiscountValue);

    this.model.fldTaxableValue = Number(fldTaxableValue.toFixed(2));

    const fldSGSTPercentage = Number(this.model.fldSGSTPercentage) || 0;
    const fldCGSTPercentage = Number(this.model.fldCGSTPercentage) || 0;
    const fldIGSTPercentage = Number(this.model.fldIGSTPercentage) || 0;

    let fldSGSTValue = 0;
    let fldCGSTValue = 0;
    let fldIGSTValue = 0;

    if (fldSGSTPercentage > 0) {
      fldSGSTValue = (fldTaxableValue * fldSGSTPercentage) / 100;
    }

    if (fldCGSTPercentage > 0) {
      fldCGSTValue = (fldTaxableValue * fldCGSTPercentage) / 100;
    }

    if (fldIGSTPercentage > 0) {
      fldIGSTValue = (fldTaxableValue * fldIGSTPercentage) / 100;
    }

    this.model.fldSGSTValue = Number(fldSGSTValue.toFixed(2));
    this.model.fldCGSTValue = Number(fldCGSTValue.toFixed(2));
    this.model.fldIGSTValue = Number(fldIGSTValue.toFixed(2));

    let gstTotalValue = 0;
    gstTotalValue = Number(
      (fldSGSTValue + fldCGSTValue + fldIGSTValue).toFixed(2),
    );

    this.model.fldGSTValue = gstTotalValue;

    // let totalValue = fldTaxableValue + gstTotalValue;

    // this.model.fldDiscountValue = fldGrossValue - fldDiscountValuederived

    this.model.fldTotalValue = Number(
      Number(fldTaxableValue + gstTotalValue).toFixed(2),
    );
  }

  onItemRowDoubleClick(selectedItem: any): void {
    this.model.fldFKItem = Number(selectedItem?.fldId) || 0;
    this.model.fldItemDescription =
      selectedItem?.fldDesc ?? selectedItem?.fldDescription ?? "";

    this.fldFKHsnCode = Number(selectedItem?.fldFKHSNCode) || 0;

    // this.tblHSNMaster$ = this.tblHSNMasterService.getTblHSNMasterById(this.fldFKHsnCode);

    // this.fldGSTPercentage = Number(this.tblHSNMaster$?.fldSalesCode) || 0;

    this.tblHSNMasterService.getTblHSNMasterById(this.fldFKHsnCode).subscribe({
      next: (data) => {
        this.fldGSTPercentage = Number(data?.fldSalesCode) || 0;
        this.applyGstPercentages();
        this.calculateItemValue();
      },
      error: () => {
        this.fldGSTPercentage = 0;
        this.applyGstPercentages();
        this.calculateItemValue();
      },
    });

    // this.model.fldItemSize = selectedItem?.fldSize ?? "";
    // this.model.fldItemColour = selectedItem?.fldColour ?? "";
    // this.model.fldFKPurchaseUOM = selectedItem?.fldFKPurchaseUOM ?? "";
    // this.model.fldFKUsageUOM = selectedItem?.fldFKUsageUOM ?? "";
    this.model.fldFKHSNCode = this.fldFKHsnCode ?? 0;
    this.showItemSelectionGrid = false;
  }

  showItemGrid(): void {
    this.showItemSelectionGrid = true;
    if (this.itemGridLoadFailed || this.itemMasters.length === 0) {
      this.loadItemSelectionGrid();
    }
  }

  retryItemGrid(): void {
    this.showItemSelectionGrid = true;
    this.loadItemSelectionGrid();
  }

  private loadItemSelectionGrid(): void {
    this.itemMasterLoadSubscription?.unsubscribe();
    this.isItemGridLoading = true;
    this.itemGridLoadFailed = false;

    this.tblItemMaster$ =
      this.tblItemMasterService.getActiveLeanTblItemMasters();
    this.itemMasterLoadSubscription = this.tblItemMaster$.subscribe({
      next: (items) => {
        this.itemMasters = items ?? [];
        this.isItemGridLoading = false;
        this.itemGridLoadFailed = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.itemMasters = [];
        this.isItemGridLoading = false;
        this.itemGridLoadFailed = true;
        this.toastr.error(
          "Unable to load the item selection grid. Click Retry Items.",
          "Item Load Failed",
          { toastClass: "ngx-toastr custom-toast error-toast" },
        );
        console.error("Item API Error:", err);
        this.cdr.detectChanges();
      },
    });
  }

  private applyGstPercentages(): void {
    const gstPercentage = Number(this.fldGSTPercentage) || 0;
    const companyStateCode = this.normalizeStateCode(
      this.poHeaderInfo.companyStateCode,
    );
    const supplierStateCode = this.normalizeStateCode(
      this.poHeaderInfo.supplierStateCode,
    );

    this.model.fldSGSTPercentage = 0;
    this.model.fldCGSTPercentage = 0;
    this.model.fldIGSTPercentage = 0;

    if (!gstPercentage || !companyStateCode || !supplierStateCode) {
      return;
    }

    if (companyStateCode === supplierStateCode) {
      const halfGstPercentage = Number((gstPercentage / 2).toFixed(2));
      this.model.fldSGSTPercentage = halfGstPercentage;
      this.model.fldCGSTPercentage = halfGstPercentage;
    } else {
      this.model.fldIGSTPercentage = gstPercentage;
    }
  }

  private normalizeStateCode(value: unknown): string {
    return String(value ?? "")
      .trim()
      .toUpperCase();
  }

  OnFormSubmit(form: NgForm, action: "SaveAndAddNew" | "SaveAndClose"): void {
    if (this.isSaving) {
      return;
    }

    this.submitAction = action;

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.recoverAfterSubmitFailure(
        "Please complete the required fields before saving.",
      );
      return;
    }

    if (!this.model.fldFKInv || this.model.fldFKInv <= 0) {
      this.recoverAfterSubmitFailure(
        "Counter Invoice information is unavailable. Please return to the PO list and open Details again.",
      );
      return;
    }

    if (!this.model.fldFKItem || this.model.fldFKItem <= 0) {
      this.recoverAfterSubmitFailure("Please select an item before saving.");
      return;
    }

    console.log("On Submit", this.model.fldFKItem);

    // if (!this.model.fldFKHSNCode || this.model.fldFKHSNCode <= 0) {
    //   return;
    // }

    // if (!this.model.fldRemarks?.trim()) {
    //   return;
    // }

    this.isSaving = true;

    this.addTblCounterInvoiceDetailSubscription =
      this.tblCounterInvoiceDetailService
        .addTblCounterInvoiceDetail(this.model)
        .subscribe({
          next: (response) => {
            this.isSaving = false;

            this.captureSavedDetails(response);

            this.toastr.success("Record saved successfully!", "Success", {
              toastClass: "ngx-toastr custom-toast",
            });

            if (this.submitAction === "SaveAndAddNew") {
              this.resetForm();
              this.loadPurchaseOrderHeader();
              this.cdr.detectChanges();
            } else {
              this.navigateBackToDetails();
            }
          },
          error: (err) => {
            const errorMsg =
              err?.error?.message ||
              err?.error ||
              "An unexpected error occurred";

            this.toastr.error(errorMsg, "Error", {
              toastClass: "ngx-toastr custom-toast error-toast",
            });

            console.error("API Error:", err);
            this.recoverAfterSubmitFailure(undefined, false);
          },
        });
  }

  private recoverAfterSubmitFailure(
    message?: string,
    showWarning = true,
  ): void {
    this.isSaving = false;

    if (!this.model.fldFKItem) {
      this.showItemSelectionGrid = true;
      if (this.itemGridLoadFailed || this.itemMasters.length === 0) {
        this.loadItemSelectionGrid();
      }
    } else {
      // Keep the chosen item and expose Select Item so it can be changed.
      this.showItemSelectionGrid = false;
    }

    if (message && showWarning) {
      this.toastr.warning(message, "Save Not Completed", {
        toastClass: "ngx-toastr custom-toast",
      });
    }

    this.cdr.detectChanges();
  }

  private captureSavedDetails(response: unknown): void {
    const responseBody =
      (response as any)?.data ?? (response as any)?.result ?? response;
    const returnedRows = Array.isArray(responseBody)
      ? responseBody
      : responseBody && typeof responseBody === "object"
        ? [responseBody]
        : [];

    const validRows = returnedRows.filter(
      (row: any) => row?.fldFKItem !== undefined || row?.fldItemDescription,
    ) as TblCounterInvoiceDetail[];

    // Prefer the API output. If the API returns only a message/id, retain a
    // snapshot of the submitted model so the newly saved row is still shown.
    const rowsToDisplay = validRows.length
      ? validRows
      : [{ ...this.model } as unknown as TblCounterInvoiceDetail];

    for (const savedRow of rowsToDisplay) {
      const existingIndex = this.savedPurchaseOrderDetails.findIndex(
        (row) =>
          Number((row as any).fldId) > 0 &&
          Number((row as any).fldId) === Number((savedRow as any).fldId),
      );

      if (existingIndex >= 0) {
        this.savedPurchaseOrderDetails[existingIndex] = savedRow;
      } else {
        this.savedPurchaseOrderDetails = [
          ...this.savedPurchaseOrderDetails,
          savedRow,
        ];
      }
    }
  }

  resetForm() {
    ((this.model = {
      fldId: 0,
      fldFKInv: this.fldFKInv ?? 0,
      fldFKItem: 0,
      fldItemDescription: "",
      fldItemSize: "",
      fldItemColour: "",
      fldFKPurchaseUOM: "",
      fldFKUsageUOM: "",
      fldFKHSNCode: 0,
      fldQuantity: 0,
      fldRate: 0,
      fldGrossValue: 0,
      fldDiscountPercentage: 0,
      fldDiscountValue: 0,
      fldTaxableValue: 0,
      fldIGSTPercentage: 0,
      fldIGSTValue: 0,
      fldSGSTPercentage: 0,
      fldSGSTValue: 0,
      fldCGSTPercentage: 0,
      fldCGSTValue: 0,
      fldGSTValue: 0,
      fldTotalValue: 0,
      fldDeliveryDate: new Date(),
      fldRemarks: "",
      fldFKStatus: 0,
      fldInwardQuantity: 0,
      fldCancelQuantity: 0,
      fldBalanceQuantity: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    }),
      setTimeout(() => {
        const firstInput = document.getElementById("fldDescription");
        if (firstInput) {
          firstInput.focus();
        }
      }));
    this.fldFKHsnCode = null;
    this.fldGSTPercentage = null;
    this.showItemSelectionGrid = true;
  }

  backToHome(): void {
    this.navigateBackToDetails();
  }

  private navigateBackToDetails(): void {
    if (!this.fldFKInv || this.fldFKInv <= 0) {
      this.navigateBackToPurchaseOrders();
      return;
    }

    this.router
      .navigate(["/transactiontables/tblCounterInvoiceDetail", this.fldFKInv], {
        queryParams: {
          fromDate: this.poHeaderInfo.fromDate,
          toDate: this.poHeaderInfo.toDate,
        },
      })
      .then((navigated) => {
        if (!navigated) {
          this.navigateBackToPurchaseOrders();
        }
      })
      .catch(() => this.navigateBackToPurchaseOrders());
  }

  private navigateBackToPurchaseOrders(): void {
    this.router.navigate(["/transactiontables/tblCounterInvoice"], {
      queryParams: {
        fromDate: this.poHeaderInfo.fromDate,
        toDate: this.poHeaderInfo.toDate,
      },
    });
  }

  private toNumber(value: unknown): number {
    return Number(value) || 0;
  }

  private isNumericHeaderField(key: string): boolean {
    return ![
      "unitName",
      "supplierName",
      "poNo",
      "poDate",
      "dlyDate",
      "companyStateCode",
      "supplierStateCode",
      "fromDate",
      "toDate",
    ].includes(key);
  }

  ngOnDestroy(): void {
    this.addTblCounterInvoiceDetailSubscription?.unsubscribe();
    this.itemMasterLoadSubscription?.unsubscribe();
    this.headerLoadSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {
    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKInv || this.model.fldFKInv <= 0) {
      return false;
    }

    if (!this.model.fldFKItem || this.model.fldFKItem <= 0) {
      return false;
    }

    if (!this.model.fldFKHSNCode || this.model.fldFKHSNCode <= 0) {
      return false;
    }

    if (!this.model.fldRemarks?.trim()) {
      return false;
    }

    if (!this.model.fldFKStatus || this.model.fldFKStatus <= 0) {
      return false;
    }

    if (!this.model.fldInwardQuantity || this.model.fldInwardQuantity <= 0) {
      return false;
    }

    if (!this.model.fldCancelQuantity || this.model.fldCancelQuantity <= 0) {
      return false;
    }

    if (!this.model.fldBalanceQuantity || this.model.fldBalanceQuantity <= 0) {
      return false;
    }

    return true;
  }
}

