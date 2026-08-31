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

import { TblPurchaseOrder } from "../../tblPurchaseOrder/models/tblPurchaseOrder.model";
import { TblPurchaseOrderService } from "../../tblPurchaseOrder/services/tbl-purchase-order";
// import { TblItemMaster } from '../../tblItemMaster/models/tblItemMaster.model';
// import { TblItemMasterService } from '../../tblItemMaster/services/tbl-item-master';
// import { TblHSNMaster } from '../../tblHSNMaster/models/tblHSNMaster.model';
// import { TblHSNMasterService } from '../../tblHSNMaster/services/tblhs-n-master';

import { TblPurchaseOrderDetail } from "../models/tblPurchaseOrderDetail.model";
import { TblPurchaseOrderDetailAdd } from "../models/tblPurchaseOrderDetail-Add.model";
import { TblPurchaseOrderDetailService } from "../services/tbl-purchase-order-detail";
import { TblProperty } from "../../../mastertables/tblProperty/models/tblProperty.model";
import { TblItemMaster } from "../../../mastertables/tblItemMaster/models/tblItemMaster.model";
import { TblHSNMaster } from "../../../mastertables/tblHSNMaster/models/tblHSNMaster.model";
import { TblItemMasterService } from "../../../mastertables/tblItemMaster/services/tbl-item-master";
import { TblHSNMasterService } from "../../../mastertables/tblHSNMaster/services/tbl-hsnmaster";

@Component({
  selector: "app-tbl-purchase-order-detail-add",
  imports: [CommonModule, FormsModule],
  templateUrl: "./tbl-purchase-order-detail-add.html",
  styleUrl: "./tbl-purchase-order-detail-add.css",
})
export class TblPurchaseOrderDetailAddComponent implements OnDestroy {
  model: TblPurchaseOrderDetailAdd;
  submitAction: "SaveAndAddNew" | "SaveAndClose" | "exit" = "exit"; // default to exit
  private addTblPurchaseOrderDetailSubscription?: Subscription;
  @ViewChild("form") form!: NgForm;
  isSaving: boolean = false;
  fldFKPo: number | null = null;
  poHeaderInfo: any = {
    unitName: "",
    supplierName: "",
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

  // tblPurchaseOrder$?: Observable<TblPurchaseOrder[]>
  tblItemMaster$?: Observable<TblItemMaster[]>;
  // tblHSNMaster$?: Observable<TblHSNMaster[]>
  // tblPropertyStatus$?: Observable<TblProperty[]>;

  constructor(
    private tblPurchaseOrderDetailService: TblPurchaseOrderDetailService,
    private tblPropertySharedService: TblPropertySharedservice,
    // private tblPurchaseOrderService: TblPurchaseOrderService,
    private tblItemMasterService: TblItemMasterService,
    // private tblHSNMasterService: TblHSNMasterService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this.model = {
      fldId: 0,
      fldFKPo: 0,
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
    const fldFKUserParam = this.route.snapshot.paramMap.get("fldFKPo");

    if (fldFKUserParam) {
      this.fldFKPo = parseInt(fldFKUserParam, 10);

      this.model.fldFKPo = this.fldFKPo;
    }

    const queryParams = this.route.snapshot.queryParams;
    Object.keys(this.poHeaderInfo).forEach((key) => {
      const value = queryParams[key];
      if (value !== undefined) {
        this.poHeaderInfo[key] = this.isNumericHeaderField(key)
          ? Number(value) || 0
          : value;
      }
    });

    // this.tblPropertyStatus$ = this.tblPropertySharedService.getPropertiesByType('Status');

    // this.tblPurchaseOrder$ = this.tblPurchaseOrderService.getActiveLeanTblPurchaseOrders();
    this.tblItemMaster$ =
      this.tblItemMasterService.getActiveLeanTblItemMasters();
    // this.tblHSNMaster$ = this.tblHSNMasterService.getActiveLeanTblHSNMasters();

    setTimeout(() => {
      if (this.form && this.form.controls["fldDescription"]) {
        this.form.controls["fldDescription"].markAsTouched();
      }
    });
  }

  calculateItemValue(): void {
    let fldQuantity = Number(this.model.fldQuantity) || 0;
    let fldRate = Number(this.model.fldRate) || 0;
    let fldGrossValue = fldQuantity * fldRate;

    this.model.fldGrossValue = Number(Number(fldGrossValue).toFixed(2));

    let fldDiscountPercentage = Number(this.model.fldDiscountPercentage) || 0;
    let fldDiscountValuederived = 0;
    if (fldDiscountPercentage > 0) {
      let fldDiscountValuederived =
        (fldGrossValue * fldDiscountPercentage) / 100;

      this.model.fldDiscountValue = fldDiscountValuederived;
    }

    let fldDiscountValue = Number(this.model.fldDiscountValue) || 0;
    let fldTaxableValue = fldGrossValue - fldDiscountValue;

    this.model.fldTaxableValue = fldTaxableValue;

    let fldSGSTPercentage = Number(this.model.fldSGSTPercentage) || 0;
    let fldCGSTPercentage = Number(this.model.fldCGSTPercentage) || 0;
    let fldIGSTPercentage = Number(this.model.fldIGSTPercentage) || 0;

    let fldSGSTValue = 0;
    let fldCGSTValue = 0;
    let fldIGSTValue = 0;

    console.log("fldSGSTPercentage", fldSGSTPercentage);

    if (fldSGSTPercentage > 0) {
      fldSGSTValue = (fldTaxableValue * fldSGSTPercentage) / 100;
    }

    if (fldCGSTPercentage > 0) {
      fldCGSTValue = (fldTaxableValue * fldCGSTPercentage) / 100;
    }

    if (fldIGSTPercentage > 0) {
      fldIGSTValue = (fldTaxableValue * fldIGSTPercentage) / 100;
    }

    this.model.fldSGSTValue = fldSGSTValue;
    this.model.fldCGSTValue = fldCGSTValue;
    this.model.fldIGSTValue = fldIGSTValue;

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
    this.model.fldItemSize = selectedItem?.fldSize ?? "";
    this.model.fldItemColour = selectedItem?.fldColour ?? "";
    this.model.fldFKPurchaseUOM = selectedItem?.fldFKPurchaseUOM ?? "";
    this.model.fldFKUsageUOM = selectedItem?.fldFKUsageUOM ?? "";
    this.model.fldFKHSNCode = Number(selectedItem?.fldFKHSNCode) || 0;
  }

  OnFormSubmit(form: NgForm, action: "SaveAndAddNew" | "SaveAndClose"): void {
    if (this.isSaving) {
      return;
    }

    this.submitAction = action;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.model.fldFKPo || this.model.fldFKPo <= 0) {
      return;
    }

    if (!this.model.fldFKItem || this.model.fldFKItem <= 0) {
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

    this.addTblPurchaseOrderDetailSubscription =
      this.tblPurchaseOrderDetailService
        .addTblPurchaseOrderDetail(this.model)
        .subscribe({
          next: (response) => {
            this.isSaving = false;

            this.applySavedDetailToHeader();

            this.toastr.success("Record saved successfully!", "Success", {
              toastClass: "ngx-toastr custom-toast",
            });

            if (this.submitAction === "SaveAndAddNew") {
              this.resetForm();
              this.cdr.detectChanges();
            } else {
              this.navigateBackToDetails();
            }
          },
          error: (err) => {
            this.isSaving = false;

            const errorMsg =
              err?.error?.message ||
              err?.error ||
              "An unexpected error occurred";

            this.toastr.error(errorMsg, "Error", {
              toastClass: "ngx-toastr custom-toast error-toast",
            });

            console.error("API Error:", err);
          },
        });
  }

  resetForm() {
    ((this.model = {
      fldId: 0,
      fldFKPo: this.fldFKPo ?? 0,
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
  }

  backToHome(): void {
    this.navigateBackToDetails();
  }

  private applySavedDetailToHeader(): void {
    this.poHeaderInfo.totalQty =
      this.toNumber(this.poHeaderInfo.totalQty) +
      this.toNumber(this.model.fldQuantity);
    this.poHeaderInfo.inwardQty =
      this.toNumber(this.poHeaderInfo.inwardQty) +
      this.toNumber(this.model.fldInwardQuantity);
    this.poHeaderInfo.cancelQty =
      this.toNumber(this.poHeaderInfo.cancelQty) +
      this.toNumber(this.model.fldCancelQuantity);
    this.poHeaderInfo.balanceQty =
      this.poHeaderInfo.totalQty -
      this.poHeaderInfo.inwardQty -
      this.poHeaderInfo.cancelQty;
    this.poHeaderInfo.itemsGrossValue =
      this.toNumber(this.poHeaderInfo.itemsGrossValue) +
      this.toNumber(this.model.fldGrossValue);
    this.poHeaderInfo.itemsTaxableValue =
      this.toNumber(this.poHeaderInfo.itemsTaxableValue) +
      this.toNumber(this.model.fldTaxableValue);
    this.poHeaderInfo.itemsGSTValue =
      this.toNumber(this.poHeaderInfo.itemsGSTValue) +
      this.toNumber(this.model.fldGSTValue);
    this.poHeaderInfo.itemsTotalValue =
      this.toNumber(this.poHeaderInfo.itemsTotalValue) +
      this.toNumber(this.model.fldTotalValue);
    this.poHeaderInfo.grandGrossValue =
      this.poHeaderInfo.itemsTotalValue -
      this.toNumber(this.poHeaderInfo.discountValue);
    this.poHeaderInfo.grandTotalValue = Number(
      (
        this.poHeaderInfo.grandGrossValue +
        this.toNumber(this.poHeaderInfo.otherPlusValue) -
        this.toNumber(this.poHeaderInfo.otherMinusValue) +
        this.toNumber(this.poHeaderInfo.roundoff)
      ).toFixed(2),
    );
  }

  private navigateBackToDetails(): void {
    this.router.navigate(
      ["/transactiontables/tblPurchaseOrderDetail", this.fldFKPo],
      { queryParams: this.poHeaderInfo },
    );
  }

  private toNumber(value: unknown): number {
    return Number(value) || 0;
  }

  private isNumericHeaderField(key: string): boolean {
    return !["unitName", "supplierName", "poNo", "poDate", "dlyDate"].includes(
      key,
    );
  }

  ngOnDestroy(): void {
    this.addTblPurchaseOrderDetailSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {
    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKPo || this.model.fldFKPo <= 0) {
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
