import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblItemMasterService } from '../services/tbl-item-master';
import { TblItemMaster } from '../models/tblItemMaster.model';
import { TblItemMasterUpdate } from '../models/tblItemMaster-Update.model';

import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblCompanyMaster } from '../../tblCompanyMaster/models/tblCompanyMaster.model';
import { TblCompanyMasterService } from '../../tblCompanyMaster/services/tbl-company-master';
import { TblHSNMaster } from '../../tblHSNMaster/models/tblHSNMaster.model';
import { TblHSNMasterService } from '../../tblHSNMaster/services/tbl-hsnmaster';


@Component({
  selector: 'app-tbl-item-master-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-item-master-update.html',
  styleUrl: './tbl-item-master-update.css',
})

export class TblItemMasterUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblItemMasterSubscription?: Subscription;
  private deleteTblItemMasterSubscription?: Subscription;
  tblItemMaster?: TblItemMasterUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit
  activeConversionField: 'purchaseToUsage' | 'usageToPurchase' | null = null;

  @ViewChild('form') form!: NgForm;

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
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  
  ngOnInit(): void {


    this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveTblCompanyMasters();
    this.tblHSNMaster$ = this.tblHSNMasterService.getActiveTblHSNMasters();

    this.tblPropertyType$ = this.tblPropertySharedService.getPropertiesByType('Item Type');
    this.tblPropertyCategory$ = this.tblPropertySharedService.getPropertiesByType('Item Category');
    this.tblPropertySubcategory$ = this.tblPropertySharedService.getPropertiesByType('Item Sub Category');
    this.tblPropertyBrand$ = this.tblPropertySharedService.getPropertiesByType('Item Brand');
    this.tblPropertySource$ = this.tblPropertySharedService.getPropertiesByType('Item Source');
    this.tblPropertyColor$ = this.tblPropertySharedService.getPropertiesByType('Colour');
    this.tblPropertyPurchaseUOM$ = this.tblPropertySharedService.getPropertiesByType('Unit of Measurement');
    this.tblPropertyUsageUOM$ = this.tblPropertySharedService.getPropertiesByType('Unit of Measurement');
    this.tblPropertySize$ = this.tblPropertySharedService.getPropertiesByType('Item Size');


    setTimeout(() => {
      if (this.form && this.form.controls['fldDescription']) {
        this.form.controls['fldDescription'].markAsTouched();
      }
    });
    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams
    ])
      .subscribe(([params, queryParams]) => {
        const idParam = params.get('id');
        this.id = idParam ? parseInt(idParam, 10) : null;
        this.actionType = queryParams['action'];

        if (this.id) {
          this.tblItemMasterService.getTblItemMasterById(this.id)
            .subscribe({
              next: (response) => {
                this.tblItemMaster = response;
                this.cdr.detectChanges();
              }
            });
        }
      });
  }


  generateDescription(): void {
    if (!this.tblItemMaster) {
      return;
    }

    const propertyIds = [
      this.tblItemMaster.fldFKCategory,
      this.tblItemMaster.fldFKSubcategory,
      this.tblItemMaster.fldFKBrand,
      this.tblItemMaster.fldFKSource,
      this.tblItemMaster.fldFKColor,
      this.tblItemMaster.fldFKSize
    ].map(Number);

    const selectedDescriptions = Array.from(
      document.querySelectorAll<HTMLSelectElement>(
        '.item-description-part'
      )
    )
      .map(
        select =>
          select.options[select.selectedIndex]?.text?.trim() ?? ''
      )
      .filter(
        (description, index) =>
          propertyIds[index] > 0 &&
          description.length > 0 &&
          description.toUpperCase() !== 'NA'
      );

    this.tblItemMaster.fldDesc = selectedDescriptions.join(' ');
  }

  onUomChange(): void {
    this.activeConversionField = null;

    if (!this.tblItemMaster) {
      return;
    }

    if (Number(this.tblItemMaster?.fldFKPurchaseUOM) === Number(this.tblItemMaster?.fldFKUsageUOM) &&
      Number(this.tblItemMaster?.fldFKPurchaseUOM) > 0) {
      this.tblItemMaster.fldPurchasetoUsageConversionRate = 1;
      this.tblItemMaster.fldUsagetoPurchaseConversionRate = 1;
      return;
    }

    this.tblItemMaster.fldPurchasetoUsageConversionRate = 0;
    this.tblItemMaster.fldUsagetoPurchaseConversionRate = 0;
  }

  onPurchaseToUsageRateChange(value: number): void {
    if (!this.tblItemMaster) {
      return;
    }

    if (Number(value) > 0) {
      this.activeConversionField = 'purchaseToUsage';
      this.tblItemMaster.fldUsagetoPurchaseConversionRate = 1;
    } else {
      this.activeConversionField = null;
      this.tblItemMaster.fldUsagetoPurchaseConversionRate = 0;
    }
  }

  onUsageToPurchaseRateChange(value: number): void {
    if (!this.tblItemMaster) {
      return;
    }

    if (Number(value) > 0) {
      this.activeConversionField = 'usageToPurchase';
      this.tblItemMaster.fldPurchasetoUsageConversionRate = 1;
    } else {
      this.activeConversionField = null;
      this.tblItemMaster.fldPurchasetoUsageConversionRate = 0;
    }
  }

  get areUomsSame(): boolean {
    return Number(this.tblItemMaster?.fldFKPurchaseUOM) > 0 &&
      Number(this.tblItemMaster?.fldFKPurchaseUOM) === Number(this.tblItemMaster?.fldFKUsageUOM);
  }

  OnFormSubmit(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.tblItemMaster?.fldFKCompany || this.tblItemMaster?.fldFKCompany <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKType || this.tblItemMaster?.fldFKType <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKCategory || this.tblItemMaster?.fldFKCategory <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKSubcategory || this.tblItemMaster?.fldFKSubcategory <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKBrand || this.tblItemMaster?.fldFKBrand <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKSource || this.tblItemMaster?.fldFKSource <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldCode?.trim()) {
      return;
    }

    if (!this.tblItemMaster?.fldDesc?.trim()) {
      return;
    }

    if (!this.tblItemMaster?.fldName?.trim()) {
      return;
    }

    if (!this.tblItemMaster?.fldFKColor || this.tblItemMaster?.fldFKColor <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKPurchaseUOM || this.tblItemMaster?.fldFKPurchaseUOM <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKUsageUOM || this.tblItemMaster?.fldFKUsageUOM <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldPurchasetoUsageConversionRate || this.tblItemMaster?.fldPurchasetoUsageConversionRate <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldUsagetoPurchaseConversionRate || this.tblItemMaster?.fldUsagetoPurchaseConversionRate <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKHSNCode || this.tblItemMaster?.fldFKHSNCode <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldFKSize || this.tblItemMaster?.fldFKSize <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldPurchasePrice || this.tblItemMaster?.fldPurchasePrice <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldJobworkPrice || this.tblItemMaster?.fldJobworkPrice <= 0) {
      return;
    }

    if (!this.tblItemMaster?.fldSalesPrice || this.tblItemMaster?.fldSalesPrice <= 0) {
      return;
    }

    const TblItemMasterUpdateRequest: TblItemMasterUpdate = {
      fldId: this.tblItemMaster?.fldId ?? 0,
      fldFKCompany: this.tblItemMaster?.fldFKCompany ?? 0,
      fldFKType: this.tblItemMaster?.fldFKType ?? 0,
      fldFKCategory: this.tblItemMaster?.fldFKCategory ?? 0,
      fldFKSubcategory: this.tblItemMaster?.fldFKSubcategory ?? 0,
      fldFKBrand: this.tblItemMaster?.fldFKBrand ?? 0,
      fldFKSource: this.tblItemMaster?.fldFKSource ?? 0,
      fldCode: this.tblItemMaster?.fldCode ?? '',
      fldDesc: this.tblItemMaster?.fldDesc ?? '',
      fldName: this.tblItemMaster?.fldName ?? '',
      fldFKColor: this.tblItemMaster?.fldFKColor ?? 0,
      fldFKPurchaseUOM: this.tblItemMaster?.fldFKPurchaseUOM ?? 0,
      fldFKUsageUOM: this.tblItemMaster?.fldFKUsageUOM ?? 0,
      fldPurchasetoUsageConversionRate: this.tblItemMaster?.fldPurchasetoUsageConversionRate ?? 0,
      fldUsagetoPurchaseConversionRate: this.tblItemMaster?.fldUsagetoPurchaseConversionRate ?? 0,
      fldFKHSNCode: this.tblItemMaster?.fldFKHSNCode ?? 0,
      fldFKSize: this.tblItemMaster?.fldFKSize ?? 0,
      fldPurchasePrice: this.tblItemMaster?.fldPurchasePrice ?? 0,
      fldJobworkPrice: this.tblItemMaster?.fldJobworkPrice ?? 0,
      fldSalesPrice: this.tblItemMaster?.fldSalesPrice ?? 0,
      fldIsActive: this.tblItemMaster?.fldIsActive ?? true,
      fldCreatedBy: this.tblItemMaster?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblItemMaster?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblItemMaster?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblItemMaster?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblItemMasterSubscription = this.tblItemMasterService.updateTblItemMaster(TblItemMasterUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              this.router.navigateByUrl('mastertables/tblItemMaster');
            },
            error: (err) => {
              const errorMsg = err?.error?.message || err?.error || 'An unexpected error occurred';

              this.toastr.error(errorMsg, 'Error', {
                toastClass: 'ngx-toastr custom-toast error-toast'
              });

              console.error('API Error:', err);
            }
          });
      } else {

        const proceed = confirm('R U Sure, U Want to Delete the selected Record?');

        if (proceed) {
          this.deleteTblItemMasterSubscription = this.tblItemMasterService.deleteTblItemMaster(TblItemMasterUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  this.router.navigateByUrl('mastertables/tblItemMaster');
                }
              },
              error: (err) => {
                const errorMsg = err?.error?.message || err?.error || 'An unexpected error occurred';

                this.toastr.error(errorMsg, 'Error', {
                  toastClass: 'ngx-toastr custom-toast error-toast'
                });

                console.error('API Error:', err);
              }
            });
        }
      }
    }
  }

  backToHome(): void {
    this.router.navigateByUrl('mastertables/tblItemMaster');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblItemMasterSubscription?.unsubscribe();
    this.deleteTblItemMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKCompany || this.tblItemMaster?.fldFKCompany <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKType || this.tblItemMaster?.fldFKType <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKCategory || this.tblItemMaster?.fldFKCategory <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKSubcategory || this.tblItemMaster?.fldFKSubcategory <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKBrand || this.tblItemMaster?.fldFKBrand <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKSource || this.tblItemMaster?.fldFKSource <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldCode?.trim()) {
      return false;
    }

    if (!this.tblItemMaster?.fldDesc?.trim()) {
      return false;
    }

    if (!this.tblItemMaster?.fldName?.trim()) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKColor || this.tblItemMaster?.fldFKColor <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKPurchaseUOM || this.tblItemMaster?.fldFKPurchaseUOM <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKUsageUOM || this.tblItemMaster?.fldFKUsageUOM <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldPurchasetoUsageConversionRate || this.tblItemMaster?.fldPurchasetoUsageConversionRate <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldUsagetoPurchaseConversionRate || this.tblItemMaster?.fldUsagetoPurchaseConversionRate <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKHSNCode || this.tblItemMaster?.fldFKHSNCode <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldFKSize || this.tblItemMaster?.fldFKSize <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldPurchasePrice || this.tblItemMaster?.fldPurchasePrice <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldJobworkPrice || this.tblItemMaster?.fldJobworkPrice <= 0) {
      return false;
    }

    if (!this.tblItemMaster?.fldSalesPrice || this.tblItemMaster?.fldSalesPrice <= 0) {
      return false;
    }

    return true;
  }

}

