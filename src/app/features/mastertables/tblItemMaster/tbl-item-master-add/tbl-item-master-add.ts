import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblCompanyMaster } from '../../tblCompanyMaster/models/tblCompanyMaster.model';
import { TblCompanyMasterService } from '../../tblCompanyMaster/services/tbl-company-master';
import { TblHSNMaster } from '../../tblHSNMaster/models/tblHSNMaster.model';
import { TblHSNMasterService } from '../../tblHSNMaster/services/tbl-hsnmaster';

import { TblItemMaster } from '../models/tblItemMaster.model';
import { TblItemMasterAdd } from '../models/tblItemMaster-Add.model';
import { TblItemMasterService } from '../services/tbl-item-master';

@Component({
  selector: 'app-tbl-item-master-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-item-master-add.html',
  styleUrl: './tbl-item-master-add.css',
})

export class TblItemMasterAddComponent implements OnDestroy {
  model: TblItemMasterAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblItemMasterSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblCompanyMaster$?: Observable<TblCompanyMaster[]>
  tblPropertyType$?: Observable<TblProperty[]>;
  tblPropertyCategory$?: Observable<TblProperty[]>;
  tblPropertySubcategory$?: Observable<TblProperty[]>;
  tblPropertyBrand$?: Observable<TblProperty[]>;
  tblPropertySource$?: Observable<TblProperty[]>;
  tblPropertyColor$?: Observable<TblProperty[]>;
  tblPropertyPurchaseUOM$?: Observable<TblProperty[]>;
  tblPropertyUsageUOM$?: Observable<TblProperty[]>;
  tblHSNMaster$?: Observable<TblHSNMaster[]>
  tblPropertySize$?: Observable<TblProperty[]>;

  constructor(private tblItemMasterService: TblItemMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblCompanyMasterService: TblCompanyMasterService,
    private tblHSNMasterService: TblHSNMasterService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKCompany: 0,
      fldFKType: 0,
      fldFKCategory: 0,
      fldFKSubcategory: 0,
      fldFKBrand: 0,
      fldFKSource: 0,
      fldCode: '',
      fldDesc: '',
      fldName: '',
      fldFKColor: 0,
      fldFKPurchaseUOM: 0,
      fldFKUsageUOM: 0,
      fldPurchasetoUsageConversionRate: 0,
      fldUsagetoPurchaseConversionRate: 0,
      fldFKHSNCode: 0,
      fldFKSize: 0,
      fldPurchasePrice: 0,
      fldJobworkPrice: 0,
      fldSalesPrice: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.tblPropertyType$ = this.tblPropertySharedService.getPropertiesByType('Item Type');
    this.tblPropertyCategory$ = this.tblPropertySharedService.getPropertiesByType('Item Category');
    this.tblPropertySubcategory$ = this.tblPropertySharedService.getPropertiesByType('Item Sub Category');
    this.tblPropertyBrand$ = this.tblPropertySharedService.getPropertiesByType('Item Brand');
    this.tblPropertySource$ = this.tblPropertySharedService.getPropertiesByType('Item Source');
    this.tblPropertyColor$ = this.tblPropertySharedService.getPropertiesByType('Colour');
    this.tblPropertyPurchaseUOM$ = this.tblPropertySharedService.getPropertiesByType('Unit of Measurement');
    this.tblPropertyUsageUOM$ = this.tblPropertySharedService.getPropertiesByType('Unit of Measurement');
    this.tblPropertySize$ = this.tblPropertySharedService.getPropertiesByType('Item Size');


    this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveLeanTblCompanyMasters();
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

    if (!this.model.fldFKCompany || this.model.fldFKCompany <= 0) {
      return;
    }

    if (!this.model.fldFKType || this.model.fldFKType <= 0) {
      return;
    }

    if (!this.model.fldFKCategory || this.model.fldFKCategory <= 0) {
      return;
    }

    if (!this.model.fldFKSubcategory || this.model.fldFKSubcategory <= 0) {
      return;
    }

    if (!this.model.fldFKBrand || this.model.fldFKBrand <= 0) {
      return;
    }

    if (!this.model.fldFKSource || this.model.fldFKSource <= 0) {
      return;
    }

    if (!this.model.fldCode?.trim()) {
      return;
    }

    if (!this.model.fldDesc?.trim()) {
      return;
    }

    if (!this.model.fldName?.trim()) {
      return;
    }

    if (!this.model.fldFKColor || this.model.fldFKColor <= 0) {
      return;
    }

    if (!this.model.fldFKPurchaseUOM || this.model.fldFKPurchaseUOM <= 0) {
      return;
    }

    if (!this.model.fldFKUsageUOM || this.model.fldFKUsageUOM <= 0) {
      return;
    }

    if (!this.model.fldPurchasetoUsageConversionRate || this.model.fldPurchasetoUsageConversionRate <= 0) {
      return;
    }

    if (!this.model.fldUsagetoPurchaseConversionRate || this.model.fldUsagetoPurchaseConversionRate <= 0) {
      return;
    }

    if (!this.model.fldFKHSNCode || this.model.fldFKHSNCode <= 0) {
      return;
    }

    if (!this.model.fldFKSize || this.model.fldFKSize <= 0) {
      return;
    }

    if (!this.model.fldPurchasePrice || this.model.fldPurchasePrice <= 0) {
      return;
    }

    if (!this.model.fldJobworkPrice || this.model.fldJobworkPrice <= 0) {
      return;
    }

    if (!this.model.fldSalesPrice || this.model.fldSalesPrice <= 0) {
      return;
    }

    this.isSaving = true;

    this.addTblItemMasterSubscription = this.tblItemMasterService.addTblItemMaster(this.model)
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
            this.router.navigateByUrl('mastertables/tblItemMaster');
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
      fldFKCompany: 0,
      fldFKType: 0,
      fldFKCategory: 0,
      fldFKSubcategory: 0,
      fldFKBrand: 0,
      fldFKSource: 0,
      fldCode: '',
      fldDesc: '',
      fldName: '',
      fldFKColor: 0,
      fldFKPurchaseUOM: 0,
      fldFKUsageUOM: 0,
      fldPurchasetoUsageConversionRate: 0,
      fldUsagetoPurchaseConversionRate: 0,
      fldFKHSNCode: 0,
      fldFKSize: 0,
      fldPurchasePrice: 0,
      fldJobworkPrice: 0,
      fldSalesPrice: 0,
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
    this.router.navigateByUrl('mastertables/tblItemMaster');
  }

  ngOnDestroy(): void {
    this.addTblItemMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKCompany || this.model.fldFKCompany <= 0) {
      return false;
    }

    if (!this.model.fldFKType || this.model.fldFKType <= 0) {
      return false;
    }

    if (!this.model.fldFKCategory || this.model.fldFKCategory <= 0) {
      return false;
    }

    if (!this.model.fldFKSubcategory || this.model.fldFKSubcategory <= 0) {
      return false;
    }

    if (!this.model.fldFKBrand || this.model.fldFKBrand <= 0) {
      return false;
    }

    if (!this.model.fldFKSource || this.model.fldFKSource <= 0) {
      return false;
    }

    if (!this.model.fldCode?.trim()) {
      return false;
    }

    if (!this.model.fldDesc?.trim()) {
      return false;
    }

    if (!this.model.fldName?.trim()) {
      return false;
    }

    if (!this.model.fldFKColor || this.model.fldFKColor <= 0) {
      return false;
    }

    if (!this.model.fldFKPurchaseUOM || this.model.fldFKPurchaseUOM <= 0) {
      return false;
    }

    if (!this.model.fldFKUsageUOM || this.model.fldFKUsageUOM <= 0) {
      return false;
    }

    if (!this.model.fldPurchasetoUsageConversionRate || this.model.fldPurchasetoUsageConversionRate <= 0) {
      return false;
    }

    if (!this.model.fldUsagetoPurchaseConversionRate || this.model.fldUsagetoPurchaseConversionRate <= 0) {
      return false;
    }

    if (!this.model.fldFKHSNCode || this.model.fldFKHSNCode <= 0) {
      return false;
    }

    if (!this.model.fldFKSize || this.model.fldFKSize <= 0) {
      return false;
    }

    if (!this.model.fldPurchasePrice || this.model.fldPurchasePrice <= 0) {
      return false;
    }

    if (!this.model.fldJobworkPrice || this.model.fldJobworkPrice <= 0) {
      return false;
    }

    if (!this.model.fldSalesPrice || this.model.fldSalesPrice <= 0) {
      return false;
    }

    return true;
  }

}

