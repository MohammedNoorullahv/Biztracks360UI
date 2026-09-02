import {
  Component,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

import { TblCounterInvoice } from "../models/tblCounterInvoice.model";
import { TblCounterInvoiceAdd } from "../models/tblCounterInvoice-Add.model";
import { TblCounterInvoiceService } from "../services/tbl-counter-invoice";

import { TblProperty } from "../../../mastertables/tblProperty/models/tblProperty.model";
import { TblUnitMaster } from "../../../mastertables/tblUnitMaster/models/tblUnitMaster.model";
import { TblPropertyMasterService } from "../../../mastertables/tblPropertyMaster/services/tbl-property-master";
import { TblPropertyService } from "../../../mastertables/tblProperty/services/tbl-property";
import { TblPropertySharedservice } from "../../../../shared/services/tbl-property-shared";
import { TblUnitMasterService } from "../../../mastertables/tblUnitMaster/services/tbl-unit-master";
import { TblPartyDetail } from "../../../mastertables/tblPartyDetail/models/tblPartyDetail.model";
import { TblPartyDetailService } from "../../../mastertables/tblPartyDetail/services/tbl-party-detail";

@Component({
  selector: 'app-tbl-counter-invoice-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-counter-invoice-add.html',
  styleUrl: './tbl-counter-invoice-add.css',
})

export class TblCounterInvoiceAddComponent implements OnDestroy {
  model: TblCounterInvoiceAdd;
  submitAction:
    | "SaveAndAddNew"
    | "SaveAndClose"
    | "SaveAndProceedToDetail"
    | "exit" = "exit";
  private addTblCounterInvoiceSubscription?: Subscription;
  private unitMasterSubscription?: Subscription;
  private lastPurchaseOrderSubscription?: Subscription;
  @ViewChild("form") form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblUnitMaster$?: Observable<TblUnitMaster[]>;
  tblPartyDetail$?: Observable<TblPartyDetail[]>;
  tblPropertyStatus$?: Observable<TblProperty[]>;

  tblLastPurchaseOrder$?: Observable<TblCounterInvoice>;

  minPODate = "";
  minDeliveryStartDate = "";
  minDeliveryEndDate = "";
  fromDate = "";
  toDate = "";

  constructor(
    private tblCounterInvoiceService: TblCounterInvoiceService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblUnitMasterService: TblUnitMasterService,
    private tblPartyDetailService: TblPartyDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.model = {
      fldId: 0,
      fldFKUnitId: 0,
      fldInvNo: "",
      fldInvDate: new Date(),
      fldFKSupplierID: 0,
      fldDeliveryStartDate: new Date(),
      fldDeliveryEndDate: new Date(),
      fldTotalQty: 0,
      fldInwardQty: 0,
      fldCancelQty: 0,
      fldBalanceQty: 0,
      fldRemarks: "",
      fldFKStatus: 0,
      fldItemsGrossValue: 0,
      fldItemsTaxableValue: 0,
      fldItemsGSTValue: 0,
      fldItemsTotalValue: 0,
      fldDiscountPercentage: 0,
      fldDiscountValue: 0,
      fldGrandGrossValue: 0,
      fldOtherPlusValue: 0,
      fldOtherMinusValue: 0,
      fldRoundoff: 0,
      fldGrandTotalValue: 0,
      fldPaidAmount: 0,
      fldFKPaymentStatus: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.fromDate = this.route.snapshot.queryParamMap.get("fromDate") ?? "";
    this.toDate = this.route.snapshot.queryParamMap.get("toDate") ?? "";

    this.tblPropertyStatus$ =
      this.tblPropertySharedService.getPropertiesByType("Status");

    this.tblUnitMaster$ =
      this.tblUnitMasterService.getActiveLeanTblUnitMasters();
    this.tblPartyDetail$ =
      this.tblPartyDetailService.getActiveLeanTblPartyDetails();

    // Select the first available unit and generate its next PO number.
    this.unitMasterSubscription = this.tblUnitMaster$.subscribe((units) => {
      if (units?.length > 0) {
        this.model.fldFKUnitId = Number(units[0].fldId);
        this.loadLastPurchaseOrder(units[0]);
      }
    });
  }

  onUnitChange(unitId: number | string): void {
    const selectedUnitId = Number(unitId);
    this.model.fldFKUnitId = selectedUnitId;

    if (!selectedUnitId) {
      this.model.fldInvNo = "";
      return;
    }

    this.unitMasterSubscription?.unsubscribe();
    this.unitMasterSubscription = this.tblUnitMaster$?.subscribe((units) => {
      const selectedUnit = units.find(
        (unit) => Number(unit.fldId) === selectedUnitId,
      );
      if (selectedUnit) {
        this.loadLastPurchaseOrder(selectedUnit);
      }
    });
  }

  private loadLastPurchaseOrder(unit: TblUnitMaster): void {
    const unitId = Number(unit.fldId);
    // this.tblLastPurchaseOrder$ =
    //   this.tblCounterInvoiceService.getLastTblPurchaeOrder(unitId);

    this.lastPurchaseOrderSubscription?.unsubscribe();
    // this.lastPurchaseOrderSubscription = this.tblLastPurchaseOrder$.subscribe({
    //   next: (
    //     response: TblCounterInvoice | TblCounterInvoice[] | null | undefined,
    //   ) => {
    //     // Support APIs that return either one object or an array containing the last PO.
    //     const lastPO = Array.isArray(response) ? response[0] : response;
    //     this.applyPurchaseOrderDefaults(unit, lastPO);
    //   },
    //   error: () => {
    //     // A 404/no-record response is treated as the unit's first PO.
    //     this.applyPurchaseOrderDefaults(unit, null);
    //   },
    // });
  }

  private applyPurchaseOrderDefaults(
    unit: TblUnitMaster,
    lastPO: TblCounterInvoice | null | undefined,
  ): void {
    const lastPONo = lastPO?.fldInvNo?.trim();

    if (lastPONo) {
      const lastSerial = Number(lastPONo.slice(-4));
      const nextSerial = Number.isFinite(lastSerial) ? lastSerial + 1 : 1;
      this.model.fldInvNo = `${lastPONo.slice(0, -4)}${nextSerial.toString().padStart(4, "0")}`;
    } else {
      const unitCode = (unit.fldName ?? "")
        .trim()
        .replace(/\s+/g, "")
        .substring(0, 2)
        .toUpperCase()
        .padEnd(2, "#");

      this.model.fldInvNo = `${unitCode}/PO/${this.getFinancialYear()}-0001`;
    }

    // Ensure the generated number is reflected immediately in the readonly input.
    this.cdr.detectChanges();

    const today = this.toDateInputValue(new Date());
    const lastPODate = lastPO?.fldInvDate
      ? this.toDateInputValue(lastPO.fldInvDate)
      : today;

    this.minPODate = lastPODate;
    const poDate = lastPODate > today ? lastPODate : today;
    this.model.fldInvDate = poDate as any;
    this.onPODateChange(poDate);
  }

  onPODateChange(value: string | Date): void {
    const poDate = this.toDateInputValue(value);
    this.model.fldInvDate = poDate as any;
    this.minDeliveryStartDate = poDate;

    const currentStart = this.toDateInputValue(this.model.fldDeliveryStartDate);
    if (!currentStart || currentStart < poDate) {
      this.model.fldDeliveryStartDate = poDate as any;
    }

    this.onDeliveryStartDateChange(this.model.fldDeliveryStartDate);
  }

  onDeliveryStartDateChange(value: string | Date): void {
    const startDate = this.toDateInputValue(value);
    this.model.fldDeliveryStartDate = startDate as any;
    this.minDeliveryEndDate = startDate;

    const deliveryEndDate = new Date(`${startDate}T00:00:00`);
    deliveryEndDate.setDate(deliveryEndDate.getDate() + 7);
    this.model.fldDeliveryEndDate = this.toDateInputValue(
      deliveryEndDate,
    ) as any;
  }

  calculateGrandTotal(): void {
    const grossValue = Number(this.model.fldItemsGrossValue) || 0;
    const discountValue = Number(this.model.fldDiscountValue) || 0;
    const otherPlusValue = Number(this.model.fldOtherPlusValue) || 0;
    const otherMinusValue = Number(this.model.fldOtherMinusValue) || 0;
    const roundOffValue = Number(this.model.fldRoundoff) || 0;

    this.model.fldGrandTotalValue = Number(
      (
        grossValue -
        discountValue +
        otherPlusValue -
        otherMinusValue +
        roundOffValue
      ).toFixed(2),
    );
  }

  private getFinancialYear(date: Date = new Date()): string {
    const startYear =
      date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;

    return `${startYear.toString().slice(-2)}${(startYear + 1).toString().slice(-2)}`;
  }

  private toDateInputValue(value: string | Date): string {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      return value.substring(0, 10);
    }

    const date = value instanceof Date ? value : new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  OnFormSubmit(
    form: NgForm,
    action: "SaveAndAddNew" | "SaveAndClose" | "SaveAndProceedToDetail",
  ): void {
    if (this.isSaving) {
      return;
    }

    this.submitAction = action;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.model.fldFKUnitId || this.model.fldFKUnitId <= 0) {
      return;
    }

    this.isSaving = true;

    this.addTblCounterInvoiceSubscription = this.tblCounterInvoiceService
      .addTblCounterInvoice(this.model)
      .subscribe({
        next: (response) => {
          this.isSaving = false;

          this.toastr.success("Record saved successfully!", "Success", {
            toastClass: "ngx-toastr custom-toast",
          });

          if (this.submitAction === "SaveAndAddNew") {
            this.resetForm();
            this.cdr.detectChanges();
          } else if (this.submitAction === "SaveAndProceedToDetail") {
            const savedPurchaseOrderId = this.getSavedPurchaseOrderId(response);

            if (savedPurchaseOrderId > 0) {
              this.router.navigate(
                [
                  "/transactiontables/tblCounterInvoiceDetail",
                  savedPurchaseOrderId,
                ],
                {
                  queryParams: {
                    fromDate: this.fromDate,
                    toDate: this.toDate,
                  },
                },
              );
            } else {
              this.toastr.warning(
                "The Counter Invoice was saved, but the API did not return its ID. Please open Details from the Counter Invoice List.",
                "Saved - Navigation Unavailable",
                { toastClass: "ngx-toastr custom-toast" },
              );
              this.router.navigateByUrl("transactiontables/tblCounterInvoice");
            }
          } else {
            this.router.navigateByUrl("transactiontables/tblCounterInvoice");
          }
        },
        error: (err) => {
          this.isSaving = false;

          const errorMsg =
            err?.error?.message || err?.error || "An unexpected error occurred";

          this.toastr.error(errorMsg, "Error", {
            toastClass: "ngx-toastr custom-toast error-toast",
          });

          console.error("API Error:", err);
        },
      });
  }

  private getSavedPurchaseOrderId(response: unknown): number {
    const responseObject = response as any;
    const payload =
      responseObject?.body ??
      responseObject?.data ??
      responseObject?.result ??
      responseObject;

    if (typeof payload === "number" || typeof payload === "string") {
      return Number(payload) || 0;
    }

    return Number(
      payload?.fldId ??
      payload?.id ??
      responseObject?.fldId ??
      responseObject?.id ??
      0,
    );
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldFKUnitId: 0,
      fldInvNo: "",
      fldInvDate: new Date(),
      fldFKSupplierID: 0,
      fldDeliveryStartDate: new Date(),
      fldDeliveryEndDate: new Date(),
      fldTotalQty: 0,
      fldInwardQty: 0,
      fldCancelQty: 0,
      fldBalanceQty: 0,
      fldRemarks: "",
      fldFKStatus: 0,
      fldItemsGrossValue: 0,
      fldItemsTaxableValue: 0,
      fldItemsGSTValue: 0,
      fldItemsTotalValue: 0,
      fldDiscountPercentage: 0,
      fldDiscountValue: 0,
      fldGrandGrossValue: 0,
      fldOtherPlusValue: 0,
      fldOtherMinusValue: 0,
      fldRoundoff: 0,
      fldGrandTotalValue: 0,
      fldPaidAmount: 0,
      fldFKPaymentStatus: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };

    // Re-select the first unit and regenerate all PO/date defaults.
    this.unitMasterSubscription?.unsubscribe();
    this.unitMasterSubscription = this.tblUnitMaster$?.subscribe((units) => {
      if (units?.length > 0) {
        this.model.fldFKUnitId = Number(units[0].fldId);
        this.loadLastPurchaseOrder(units[0]);
      }
    });
  }

  backToHome(): void {
    this.router.navigateByUrl("transactiontables/tblCounterInvoice");
  }

  ngOnDestroy(): void {
    this.addTblCounterInvoiceSubscription?.unsubscribe();
    this.unitMasterSubscription?.unsubscribe();
    this.lastPurchaseOrderSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {
    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKUnitId || this.model.fldFKUnitId <= 0) {
      return false;
    }

    if (!this.model.fldInvNo?.trim()) {
      return false;
    }

    if (!this.model.fldFKSupplierID || this.model.fldFKSupplierID <= 0) {
      return false;
    }

    if (!this.model.fldRemarks?.trim()) {
      return false;
    }

    if (!this.model.fldFKStatus || this.model.fldFKStatus <= 0) {
      return false;
    }

    if (!this.model.fldPaidAmount || this.model.fldPaidAmount <= 0) {
      return false;
    }

    if (!this.model.fldFKPaymentStatus || this.model.fldFKPaymentStatus <= 0) {
      return false;
    }

    return true;
  }
}

