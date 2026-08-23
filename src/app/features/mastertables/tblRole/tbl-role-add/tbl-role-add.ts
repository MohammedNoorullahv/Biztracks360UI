import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TblCompanyMaster } from '../../tblCompanyMaster/models/tblCompanyMaster.model';
import { TblCompanyMasterService } from '../../tblCompanyMaster/services/tbl-company-master';
import { TblUnitMaster } from '../../tblUnitMaster/models/tblUnitMaster.model';
import { TblUnitMasterService } from '../../tblUnitMaster/services/tbl-unit-master';

import { TblRole } from '../models/tblRole.model';
import { TblRoleAdd } from '../models/tblRole-Add.model';
import { TblRoleService } from '../services/tbl-role';


@Component({
  selector: 'app-tbl-role-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-role-add.html',
  styleUrl: './tbl-role-add.css',
})

export class TblRoleAddComponent implements OnDestroy {
  model: TblRoleAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblRoleSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblCompanyMaster$?: Observable<TblCompanyMaster[]>
  tblUnitMaster$?: Observable<TblUnitMaster[]>

  constructor(private tblRoleService: TblRoleService,
    private tblCompanyMasterService: TblCompanyMasterService,
    private tblUnitMasterService: TblUnitMasterService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKCompany: 0,
      fldFKUnit: 0,
      fldIsSuperAdmin: true,
      fldIsAdmin: false,
      fldRoleName: '',
      fldRoleCode: 'FFFFFFFF',
      fldRole: 'Is Super Admin',
      fldViewOnly: false,
      fldCreateOrPepare: false,
      fldEdit: false,
      fldVerify: false,
      fldAuthorize: false,
      fldDelete: false,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {


    this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveLeanTblCompanyMasters();
    this.tblUnitMaster$ = this.tblUnitMasterService.getActiveLeanTblUnitMasters();



    setTimeout(() => {
      if (this.form && this.form.controls['fldDescription']) {
        this.form.controls['fldDescription'].markAsTouched();
      }
    });
  }

  // ============================================================
  // ROLE GENERATION
  // ============================================================

  OnSuperAdminChange(): void {

    if (this.model.fldIsSuperAdmin) {

      // Admin and all other permissions must be false
      this.model.fldIsAdmin = false;

      this.clearPermissions();

      this.model.fldRole = 'Is Super Admin';
      this.model.fldRoleCode = 'TFFFFFFF';

      return;
    }

    this.generateRole();
  }


  OnAdminChange(): void {

    if (this.model.fldIsAdmin) {

      // Super Admin and all other permissions must be false
      this.model.fldIsSuperAdmin = false;

      this.clearPermissions();

      this.model.fldRole = 'Is Admin';
      this.model.fldRoleCode = 'FTFFFFFF';

      return;
    }

    this.generateRole();
  }


  OnPermissionChange(): void {

    // Permissions should never remain selected
    // when Super Admin or Admin is selected.

    if (this.model.fldIsSuperAdmin || this.model.fldIsAdmin) {
      this.clearPermissions();
    }

    this.generateRole();
  }


  private clearPermissions(): void {

    this.model.fldViewOnly = false;
    this.model.fldCreateOrPepare = false;
    this.model.fldEdit = false;
    this.model.fldVerify = false;
    this.model.fldAuthorize = false;
    this.model.fldDelete = false;
  }


  private generateRole(): void {

    // ========================================================
    // SUPER ADMIN
    // ========================================================

    if (this.model.fldIsSuperAdmin) {

      this.model.fldRole = 'Is Super Admin';
      this.model.fldRoleCode = 'TFFFFFFF';

      return;
    }


    // ========================================================
    // ADMIN
    // ========================================================

    if (this.model.fldIsAdmin) {

      this.model.fldRole = 'Is Admin';
      this.model.fldRoleCode = 'FTFFFFFF';

      return;
    }


    // ========================================================
    // NORMAL ROLE / PERMISSIONS
    // ========================================================

    const permissions = [

      {
        caption: 'View Only',
        shortCaption: 'View',
        selected: this.model.fldViewOnly
      },

      {
        caption: 'Create Or Pepare',
        shortCaption: 'Crea',
        selected: this.model.fldCreateOrPepare
      },

      {
        caption: 'Edit',
        shortCaption: 'Edit',
        selected: this.model.fldEdit
      },

      {
        caption: 'Verify',
        shortCaption: 'Veri',
        selected: this.model.fldVerify
      },

      {
        caption: 'Authorize',
        shortCaption: 'Auth',
        selected: this.model.fldAuthorize
      },

      {
        caption: 'Delete',
        shortCaption: 'Dele',
        selected: this.model.fldDelete
      }

    ];


    const selectedPermissions =
      permissions.filter(permission => permission.selected);


    // ========================================================
    // GENERATE ROLE NAME
    // ========================================================

    if (selectedPermissions.length === 0) {

      this.model.fldRole = '';
    }
    else if (selectedPermissions.length === 1) {

      // View Only should not become "View Only Only"

      if (selectedPermissions[0].caption === 'View Only') {

        this.model.fldRole = 'View Only';

      }
      else {

        this.model.fldRole =
          selectedPermissions[0].caption + ' Only';

      }

    }
    else if (selectedPermissions.length <= 3) {

      // Use full captions when 2 or 3 are selected

      this.model.fldRole =
        selectedPermissions
          .map(permission => permission.caption)
          .join('+');

    }
    else {

      // More than 3:
      // use first 4 characters

      this.model.fldRole =
        selectedPermissions
          .map(permission => permission.shortCaption)
          .join('+');

    }


    // ========================================================
    // GENERATE ROLE CODE
    // ========================================================
    //
    // Character:
    //
    // 1 = Super Admin
    // 2 = Admin
    // 3 = View Only
    // 4 = Create Or Prepare
    // 5 = Edit
    // 6 = Verify
    // 7 = Authorize
    // 8 = Delete
    //
    // ========================================================

    this.model.fldRoleCode =
      'FF' +
      (this.model.fldViewOnly ? 'T' : 'F') +
      (this.model.fldCreateOrPepare ? 'T' : 'F') +
      (this.model.fldEdit ? 'T' : 'F') +
      (this.model.fldVerify ? 'T' : 'F') +
      (this.model.fldAuthorize ? 'T' : 'F') +
      (this.model.fldDelete ? 'T' : 'F');
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

    if (!this.model.fldRoleName?.trim()) {
      return;
    }

    if (!this.model.fldRole?.trim()) {
      return;
    }

    this.isSaving = true;

    this.addTblRoleSubscription = this.tblRoleService.addTblRole(this.model)
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
            this.router.navigateByUrl('mastertables/tblRole');
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
      fldIsSuperAdmin: true,
      fldIsAdmin: true,
      fldRoleName: '',
      fldRole: '',
      fldRoleCode: '',
      fldViewOnly: true,
      fldCreateOrPepare: true,
      fldEdit: true,
      fldVerify: true,
      fldAuthorize: true,
      fldDelete: true,
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
    this.router.navigateByUrl('mastertables/tblRole');
  }

  ngOnDestroy(): void {
    this.addTblRoleSubscription?.unsubscribe();
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

    if (!this.model.fldRoleName?.trim()) {
      return false;
    }

    if (!this.model.fldRole?.trim()) {
      return false;
    }

    return true;
  }

}

