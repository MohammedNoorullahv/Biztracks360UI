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

import { TblAreaMaster } from '../../tblAreaMaster/models/tblAreaMaster.model';
import { TblAreaMasterService } from '../../tblAreaMaster/services/tbl-area-master';

import { TblPartyMaster } from '../models/tblPartyMaster.model';
import { TblPartyMasterAdd } from '../models/tblPartyMaster-Add.model';
import { TblPartyMasterService } from '../services/tbl-party-master';

@Component({
  selector: 'app-tbl-party-master-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-party-master-add.html',
  styleUrl: './tbl-party-master-add.css',
})

export class TblPartyMasterAddComponent implements OnDestroy {
  model: TblPartyMasterAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblPartyMasterSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPropertyPartyCategory$?: Observable<TblProperty[]>;
  tblAreaMaster$?: Observable<TblAreaMaster[]>
  tblPropertyDesignation$?: Observable<TblProperty[]>;

  constructor(private tblPartyMasterService: TblPartyMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblAreaMasterService: TblAreaMasterService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKPartyCategory: 0,
      fldCode: '',
      fldName: '',
      fldShortName: '',
      fldAddress1: '',
      fldAddress2: '',
      fldFKArea: 0,
      fldState: '',
      fldCity: '',
      fldArea: '',
      fldPincode: '',
      fldStateCode: '',
      fldPANNo: '',
      fldGSTNo: '',
      fldContactPersonName: '',
      fldFKDesignation: 0,
      fldMobileNo: '',
      fldMailId: '',
      fldImagePath: '',
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.tblPropertyPartyCategory$ = this.tblPropertySharedService.getPropertiesByType('Party Category');
    this.tblPropertyDesignation$ = this.tblPropertySharedService.getPropertiesByType('Designation');


    this.tblAreaMaster$ = this.tblAreaMasterService.getActiveLeanTblAreaMasters();

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

    if (!this.model.fldFKPartyCategory || this.model.fldFKPartyCategory <= 0) {
      return;
    }

    if (!this.model.fldCode?.trim()) {
      return;
    }

    if (!this.model.fldName?.trim()) {
      return;
    }

    if (!this.model.fldAddress1?.trim()) {
      return;
    }

    if (!this.model.fldFKArea || this.model.fldFKArea <= 0) {
      return;
    }

    if (!this.model.fldFKDesignation || this.model.fldFKDesignation <= 0) {
      return;
    }

    if (!this.model.fldMobileNo?.trim()) {
      return;
    }

    this.isSaving = true;

    this.addTblPartyMasterSubscription = this.tblPartyMasterService.addTblPartyMaster(this.model)
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
            this.router.navigateByUrl('mastertables/tblPartyMaster');
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

  onSelectChange(event: Event, targetField: keyof TblPartyMaster): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.model as any)[targetField] = selectedText;
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldFKPartyCategory: 0,
      fldCode: '',
      fldName: '',
      fldShortName: '',
      fldAddress1: '',
      fldAddress2: '',
      fldFKArea: 0,
      fldState: '',
      fldCity: '',
      fldArea: '',
      fldPincode: '',
      fldStateCode: '',
      fldPANNo: '',
      fldGSTNo: '',
      fldContactPersonName: '',
      fldFKDesignation: 0,
      fldMobileNo: '',
      fldMailId: '',
      fldImagePath: '',
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
    this.router.navigateByUrl('mastertables/tblPartyMaster');
  }

  ngOnDestroy(): void {
    this.addTblPartyMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKPartyCategory || this.model.fldFKPartyCategory <= 0) {
      return false;
    }

    if (!this.model.fldCode?.trim()) {
      return false;
    }

    if (!this.model.fldName?.trim()) {
      return false;
    }

    if (!this.model.fldAddress1?.trim()) {
      return false;
    }

    if (!this.model.fldFKArea || this.model.fldFKArea <= 0) {
      return false;
    }

    if (!this.model.fldFKDesignation || this.model.fldFKDesignation <= 0) {
      return false;
    }

    if (!this.model.fldMobileNo?.trim()) {
      return false;
    }

    return true;
  }

}
