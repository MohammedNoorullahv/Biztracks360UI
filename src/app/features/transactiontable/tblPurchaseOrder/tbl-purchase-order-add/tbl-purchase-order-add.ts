import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
// import { TblProperty } from '../../tblProperty/models/tblProperty.model';
// import { TblPropertyService } from '../../tblProperty/services/tbl-property';
// import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

// import { TblUnitMaster } from '../../tblUnitMaster/models/tblUnitMaster.model';
// import { TblUnitMasterService } from '../../tblUnitMaster/services/tbl-unit-master';
// import { TblPartyDetail } from '../../tblPartyDetail/models/tblPartyDetail.model';
// import { TblPartyDetailService } from '../../tblPartyDetail/services/tbl-party-detail';



import { TblPurchaseOrder } from '../models/tblPurchaseOrder.model';
import { TblPurchaseOrderAdd } from '../models/tblPurchaseOrder-Add.model';
import { TblPurchaseOrderService } from '../services/tbl-purchase-order';

import { TblProperty } from '../../../mastertables/tblProperty/models/tblProperty.model';
import { TblUnitMaster } from '../../../mastertables/tblUnitMaster/models/tblUnitMaster.model';
import { TblPropertyMasterService } from '../../../mastertables/tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../../mastertables/tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';
import { TblUnitMasterService } from '../../../mastertables/tblUnitMaster/services/tbl-unit-master';
import { TblPartyDetail } from '../../../mastertables/tblPartyDetail/models/tblPartyDetail.model';
import { TblPartyDetailService } from '../../../mastertables/tblPartyDetail/services/tbl-party-detail';


@Component({
  selector: 'app-tbl-purchase-order-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-purchase-order-add.html',
  styleUrl: './tbl-purchase-order-add.css',
})

export class TblPurchaseOrderAddComponent implements OnDestroy {
  model: TblPurchaseOrderAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblPurchaseOrderSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblUnitMaster$?: Observable<TblUnitMaster[]>
  tblPartyDetail$?: Observable<TblPartyDetail[]>
  tblPropertyStatus$?: Observable<TblProperty[]>;

  constructor(private tblPurchaseOrderService: TblPurchaseOrderService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblUnitMasterService: TblUnitMasterService,
    private tblPartyDetailService: TblPartyDetailService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKUnitId: 0,
      fldPONo: '',
      fldPODate: new Date(),
      fldFKSupplierID: 0,
      fldDeliveryStartDate: new Date(),
      fldDeliveryEndDate: new Date(),
      fldTotalQty: 0,
      fldInwardQty: 0,
      fldCancelQty: 0,
      fldBalanceQty: 0,
      fldRemarks: '',
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
    this.tblPropertyStatus$ = this.tblPropertySharedService.getPropertiesByType('Status');


    this.tblUnitMaster$ = this.tblUnitMasterService.getActiveLeanTblUnitMasters();
    this.tblPartyDetail$ = this.tblPartyDetailService.getActiveLeanTblPartyDetails();



    setTimeout(() => {
      if (this.form && this.form.controls['fldDescription']) {
        this.form.controls['fldDescription'].markAsTouched();
      }
    });
  }

  OnFormSubmit(form: NgForm, action: 'SaveAndAddNew' | 'SaveAndClose'): void {

    console.log("01. On Form Submit");
    if (this.isSaving) {
      return;
    }

    this.submitAction = action;

    console.log("02. this.submitAction", action);

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.model.fldFKUnitId || this.model.fldFKUnitId <= 0) {
      return;
    }

    
    this.isSaving = true;

    console.log("03. his.isSaving", this.isSaving);

    this.addTblPurchaseOrderSubscription = this.tblPurchaseOrderService.addTblPurchaseOrder(this.model)
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
            this.router.navigateByUrl('transactiontables/tblPurchaseOrder');
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
      fldFKUnitId: 0,
      fldPONo: '',
      fldPODate: new Date(),
      fldFKSupplierID: 0,
      fldDeliveryStartDate: new Date(),
      fldDeliveryEndDate: new Date(),
      fldTotalQty: 0,
      fldInwardQty: 0,
      fldCancelQty: 0,
      fldBalanceQty: 0,
      fldRemarks: '',
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
    },
      setTimeout(() => {
        const firstInput = document.getElementById('fldDescription');
        if (firstInput) {
          firstInput.focus();
        }
      });
  }

  backToHome(): void {
    this.router.navigateByUrl('transactiontables/tblPurchaseOrder');
  }

  ngOnDestroy(): void {
    this.addTblPurchaseOrderSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKUnitId || this.model.fldFKUnitId <= 0) {
      return false;
    }

    if (!this.model.fldPONo?.trim()) {
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

