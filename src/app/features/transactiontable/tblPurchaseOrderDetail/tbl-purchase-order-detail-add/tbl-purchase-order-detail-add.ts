import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

// import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
// import { TblProperty } from '../../tblProperty/models/tblProperty.model';
// import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblPurchaseOrder } from '../../tblPurchaseOrder/models/tblPurchaseOrder.model';
import { TblPurchaseOrderService } from '../../tblPurchaseOrder/services/tbl-purchase-order';
// import { TblItemMaster } from '../../tblItemMaster/models/tblItemMaster.model';
// import { TblItemMasterService } from '../../tblItemMaster/services/tbl-item-master';
// import { TblHSNMaster } from '../../tblHSNMaster/models/tblHSNMaster.model';
// import { TblHSNMasterService } from '../../tblHSNMaster/services/tblhs-n-master';



import { TblPurchaseOrderDetail } from '../models/tblPurchaseOrderDetail.model';
import { TblPurchaseOrderDetailAdd } from '../models/tblPurchaseOrderDetail-Add.model';
import { TblPurchaseOrderDetailService } from '../services/tbl-purchase-order-detail';
import { TblProperty } from '../../../mastertables/tblProperty/models/tblProperty.model';
import { TblItemMaster } from '../../../mastertables/tblItemMaster/models/tblItemMaster.model';
import { TblHSNMaster } from '../../../mastertables/tblHSNMaster/models/tblHSNMaster.model';
import { TblItemMasterService } from '../../../mastertables/tblItemMaster/services/tbl-item-master';
import { TblHSNMasterService } from '../../../mastertables/tblHSNMaster/services/tbl-hsnmaster';


@Component({
  selector: 'app-tbl-purchase-order-detail-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-purchase-order-detail-add.html',
  styleUrl: './tbl-purchase-order-detail-add.css',
})

export class TblPurchaseOrderDetailAddComponent implements OnDestroy {
  model: TblPurchaseOrderDetailAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblPurchaseOrderDetailSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;
  fldFKPo: number | null = null;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPurchaseOrder$?: Observable<TblPurchaseOrder[]>
  tblItemMaster$?: Observable<TblItemMaster[]>
  tblHSNMaster$?: Observable<TblHSNMaster[]>
  tblPropertyStatus$?: Observable<TblProperty[]>;

  constructor(private tblPurchaseOrderDetailService: TblPurchaseOrderDetailService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblPurchaseOrderService: TblPurchaseOrderService,
    private tblItemMasterService: TblItemMasterService,
    private tblHSNMasterService: TblHSNMasterService,
    private router: Router, private route: ActivatedRoute, 
    private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKPo: 0,
      fldFKItem: 0,
      fldItemDescription: '',
      fldItemSize: '',
      fldItemColour: '',
      fldFKPurchaseUOM: '',
      fldFKUsageUOM: '',
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
      fldRemarks: '',
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
      this.route.snapshot.paramMap.get('fldFKPo');


    if (fldFKUserParam) {

      this.fldFKPo =
        parseInt(fldFKUserParam, 10);

      this.model.fldFKPo =
        this.fldFKPo;
    }

    this.tblPropertyStatus$ = this.tblPropertySharedService.getPropertiesByType('Status');


    this.tblPurchaseOrder$ = this.tblPurchaseOrderService.getActiveLeanTblPurchaseOrders();
    this.tblItemMaster$ = this.tblItemMasterService.getActiveLeanTblItemMasters();
    this.tblHSNMaster$ = this.tblHSNMasterService.getActiveLeanTblHSNMasters();



    setTimeout(() => {
      if (this.form && this.form.controls['fldDescription']) {
        this.form.controls['fldDescription'].markAsTouched();
      }
    });
  }

  OnFormSubmit(form: NgForm, action: 'SaveAndAddNew' | 'SaveAndClose'): void {

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

    if (!this.model.fldFKHSNCode || this.model.fldFKHSNCode <= 0) {
      return;
    }

    if (!this.model.fldRemarks?.trim()) {
      return;
    }

    if (!this.model.fldFKStatus || this.model.fldFKStatus <= 0) {
      return;
    }

    if (!this.model.fldInwardQuantity || this.model.fldInwardQuantity <= 0) {
      return;
    }

    if (!this.model.fldCancelQuantity || this.model.fldCancelQuantity <= 0) {
      return;
    }

    if (!this.model.fldBalanceQuantity || this.model.fldBalanceQuantity <= 0) {
      return;
    }

    this.isSaving = true;

    this.addTblPurchaseOrderDetailSubscription = this.tblPurchaseOrderDetailService.addTblPurchaseOrderDetail(this.model)
      .subscribe({
        next: (response) => {
          this.isSaving = false;

          this.toastr.success('Record saved successfully!', 'Success', {
            toastClass: 'ngx-toastr custom-toast'
          });

          if (this.submitAction === 'SaveAndAddNew') {
            this.resetForm();
            this.cdr.detectChanges();
          } else {
            this.router.navigateByUrl('transactiontables/tblPurchaseOrderDetail');
          }
        },
        error: (err) => {
          this.isSaving = false;

          const errorMsg = err?.error?.message || err?.error || 'An unexpected error occurred';

          this.toastr.error(errorMsg, 'Error', {
            toastClass: 'ngx-toastr custom-toast error-toast'
          });

          console.error('API Error:', err);
        }
      });
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldFKPo: 0,
      fldFKItem: 0,
      fldItemDescription: '',
      fldItemSize: '',
      fldItemColour: '',
      fldFKPurchaseUOM: '',
      fldFKUsageUOM: '',
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
      fldRemarks: '',
      fldFKStatus: 0,
      fldInwardQuantity: 0,
      fldCancelQuantity: 0,
      fldBalanceQuantity: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    },
      setTimeout(() => {
        const firstInput = document.getElementById('fldDescription');
        if (firstInput) {
          firstInput.focus();
        }
      });
  }

  backToHome(): void {
    this.router.navigateByUrl('transactiontables/tblPurchaseOrderDetail');
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

