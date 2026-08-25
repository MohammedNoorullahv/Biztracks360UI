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
import { TblUnitMaster } from '../../tblUnitMaster/models/tblUnitMaster.model';
import { TblUnitMasterService } from '../../tblUnitMaster/services/tbl-unit-master';
import { TblRole } from '../../tblRole/models/tblRole.model';
import { TblRoleService } from '../../tblRole/services/tbl-role';

import { TblUserHeader } from '../models/tblUserHeader.model';
import { TblUserHeaderAdd } from '../models/tblUserHeader-Add.model';
import { TblUserHeaderService } from '../services/tbl-user-header';

@Component({
  selector: 'app-tbl-user-header-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-user-header-add.html',
  styleUrl: './tbl-user-header-add.css',
})

export class TblUserHeaderAddComponent implements OnDestroy {
  model: TblUserHeaderAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblUserHeaderSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblCompanyMaster$?: Observable<TblCompanyMaster[]>
  tblUnitMaster$?: Observable<TblUnitMaster[]>
  tblPropertyUsertype$?: Observable<TblProperty[]>;
  tblPropertyDesignation$?: Observable<TblProperty[]>;
  tblRole$?: Observable<TblRole[]>

  constructor(private tblUserHeaderService: TblUserHeaderService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblCompanyMasterService: TblCompanyMasterService,
    private tblUnitMasterService: TblUnitMasterService,
    private tblRoleService: TblRoleService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKCompany: 0,
      fldFKUnit: 0,
      fldUsername: '',
      fldLoginMailId: '',
      fldPassword: '',
      fldFKUsertype: 0,
      fldFKDesignation: 0,
      fldFKRole: 0,
      fldAspNetUserId: '',
      fldContactNo: '',
      fldSignature: '',
      fldReceiveLoginAlert: true,
      fldCheckLoginIP: true,
      fldUserMacID: '',
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.tblPropertyUsertype$ = this.tblPropertySharedService.getPropertiesByType('User Type');
    this.tblPropertyDesignation$ = this.tblPropertySharedService.getPropertiesByType('Designation');


    this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveLeanTblCompanyMasters();
    this.tblUnitMaster$ = this.tblUnitMasterService.getActiveLeanTblUnitMasters();
    this.tblRole$ = this.tblRoleService.getActiveLeanTblRoles();



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

    if (!this.model.fldFKUnit || this.model.fldFKUnit <= 0) {
      return;
    }

    if (!this.model.fldUsername?.trim()) {
      return;
    }

    if (!this.model.fldLoginMailId?.trim()) {
      return;
    }

    if (!this.model.fldPassword?.trim()) {
      return;
    }

    if (!this.model.fldFKUsertype || this.model.fldFKUsertype <= 0) {
      return;
    }

    if (!this.model.fldFKDesignation || this.model.fldFKDesignation <= 0) {
      return;
    }

    if (!this.model.fldFKRole || this.model.fldFKRole <= 0) {
      return;
    }

    this.isSaving = true;

    this.addTblUserHeaderSubscription = this.tblUserHeaderService.addTblUserHeader(this.model)
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
            this.router.navigateByUrl('mastertables/tblUserHeader');
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
      fldFKUnit: 0,
      fldUsername: '',
      fldLoginMailId: '',
      fldPassword: '',
      fldFKUsertype: 0,
      fldFKDesignation: 0,
      fldFKRole: 0,
      fldAspNetUserId: '',
      fldContactNo: '',
      fldSignature: '',
      fldReceiveLoginAlert: true,
      fldCheckLoginIP: true,
      fldUserMacID: '',
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
    this.router.navigateByUrl('mastertables/tblUserHeader');
  }

  ngOnDestroy(): void {
    this.addTblUserHeaderSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKCompany || this.model.fldFKCompany <= 0) {
      return false;
    }

    if (!this.model.fldFKUnit || this.model.fldFKUnit <= 0) {
      return false;
    }

    if (!this.model.fldUsername?.trim()) {
      return false;
    }

    if (!this.model.fldLoginMailId?.trim()) {
      return false;
    }

    if (!this.model.fldPassword?.trim()) {
      return false;
    }

    if (!this.model.fldFKUsertype || this.model.fldFKUsertype <= 0) {
      return false;
    }

    if (!this.model.fldFKDesignation || this.model.fldFKDesignation <= 0) {
      return false;
    }

    if (!this.model.fldFKRole || this.model.fldFKRole <= 0) {
      return false;
    }

    return true;
  }

}
