import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblHSNMasterAdd } from '../models/tblHSNMaster-Add.model';
import { TblHSNMasterService } from '../services/tbl-hsnmaster';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';


@Component({
  selector: 'app-tbl-hsnmaster-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-hsnmaster-add.html',
  styleUrl: './tbl-hsnmaster-add.css',
})

export class TblHSNMasterAddComponent implements OnDestroy {
  model: TblHSNMasterAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblHSNMasterSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPropertyHSNCategory$?: Observable<TblProperty[]>;

  constructor(private tblHSNMasterService: TblHSNMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKHSNCategory: 0,
      fldItemNames: '',
      fldSalesCode: '',
      fldJobworkCode: '',
      fldGSTSalesPercentage: 0,
      fldGSTJobworkPercentage: 0,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.tblPropertyHSNCategory$ = this.tblPropertySharedService.getPropertiesByType('HSN Category');


    // this.tblPropertyMasterService.getActiveTblPropertyMasters().subscribe(ids => {
    //   nFldFKHSNCategoryId = ids.find(x => x.fldDescription === 'H S N Category')?.fldId;
    // });


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

    if (!this.model.fldFKHSNCategory || this.model.fldFKHSNCategory <= 0) {
      return;
    }

    if (!this.model.fldSalesCode?.trim()) {
      return;
    }

    if (!this.model.fldGSTSalesPercentage || this.model.fldGSTSalesPercentage <= 0) {
      return;
    }

    if (!this.model.fldGSTJobworkPercentage || this.model.fldGSTJobworkPercentage <= 0) {
      return;
    }

    this.isSaving = true;

    this.addTblHSNMasterSubscription = this.tblHSNMasterService.addTblHSNMaster(this.model)
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
            this.router.navigateByUrl('mastertables/tblHSNMaster');
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
      fldFKHSNCategory: 0,
      fldItemNames: '',
      fldSalesCode: '',
      fldJobworkCode: '',
      fldGSTSalesPercentage: 0,
      fldGSTJobworkPercentage: 0,
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
    this.router.navigateByUrl('mastertables/tblHSNMaster');
  }

  ngOnDestroy(): void {
    this.addTblHSNMasterSubscription?.unsubscribe();
  }



  // isFormValid(form: any): boolean {


  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKHSNCategory || this.model.fldFKHSNCategory <= 0) {
      return false;
    }

    if (!this.model.fldSalesCode?.trim()) {
      return false;
    }

    if (!this.model.fldGSTSalesPercentage || this.model.fldGSTSalesPercentage <= 0) {
      return false;
    }

    if (!this.model.fldGSTJobworkPercentage || this.model.fldGSTJobworkPercentage <= 0) {
      return false;
    }

    return true;
  }
}
