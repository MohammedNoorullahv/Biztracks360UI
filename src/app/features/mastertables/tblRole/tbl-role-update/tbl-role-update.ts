import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblRoleService } from '../services/tbl-role';
import { TblRole } from '../models/tblRole.model';
import { TblRoleUpdate } from '../models/tblRole-Update.model';

import { TblCompanyMaster } from '../../tblCompanyMaster/models/tblCompanyMaster.model';
import { TblCompanyMasterService } from '../../tblCompanyMaster/services/tbl-company-master';
import { TblUnitMaster } from '../../tblUnitMaster/models/tblUnitMaster.model';
import { TblUnitMasterService } from '../../tblUnitMaster/services/tbl-unit-master';


@Component({
  selector: 'app-tbl-role-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-role-update.html',
  styleUrl: './tbl-role-update.css',
})

export class TblRoleUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblRoleSubscription?: Subscription;
  private deleteTblRoleSubscription?: Subscription;
  tblRole?: TblRoleUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  tblCompanyMaster$?: Observable<TblCompanyMaster[]>
  tblUnitMaster$?: Observable<TblUnitMaster[]>

  constructor(private tblRoleService: TblRoleService,
    private tblCompanyMasterService: TblCompanyMasterService,
    private tblUnitMasterService: TblUnitMasterService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {


    this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveTblCompanyMasters();
    this.tblUnitMaster$ = this.tblUnitMasterService.getActiveTblUnitMasters();



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
          this.tblRoleService.getTblRoleById(this.id)
            .subscribe({
              next: (response) => {
                this.tblRole = response;
                this.cdr.detectChanges();
              }
            });
        }
      });
  }
  OnFormSubmit(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.tblRole?.fldFKCompany || this.tblRole?.fldFKCompany <= 0) {
      return;
    }

    if (!this.tblRole?.fldFKUnit || this.tblRole?.fldFKUnit <= 0) {
      return;
    }

    if (!this.tblRole?.fldRoleName?.trim()) {
      return;
    }

    if (!this.tblRole?.fldRole?.trim()) {
      return;
    }

    const TblRoleUpdateRequest: TblRoleUpdate = {
      fldId: this.tblRole?.fldId ?? 0,
      fldFKCompany: this.tblRole?.fldFKCompany ?? 0,
      fldFKUnit: this.tblRole?.fldFKUnit ?? 0,
      fldIsSuperAdmin: this.tblRole?.fldIsSuperAdmin ?? true,
      fldIsAdmin: this.tblRole?.fldIsAdmin ?? true,
      fldRoleName: this.tblRole?.fldRoleName ?? '',
      fldRole: this.tblRole?.fldRole ?? '',
      fldRoleCode: this.tblRole?.fldRoleCode ?? '',
      fldViewOnly: this.tblRole?.fldViewOnly ?? true,
      fldCreateOrPepare: this.tblRole?.fldCreateOrPepare ?? true,
      fldEdit: this.tblRole?.fldEdit ?? true,
      fldVerify: this.tblRole?.fldVerify ?? true,
      fldAuthorize: this.tblRole?.fldAuthorize ?? true,
      fldDelete: this.tblRole?.fldDelete ?? true,
      fldIsActive: this.tblRole?.fldIsActive ?? true,
      fldCreatedBy: this.tblRole?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblRole?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblRole?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblRole?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblRoleSubscription = this.tblRoleService.updateTblRole(TblRoleUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              this.router.navigateByUrl('mastertables/tblRole');
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
          this.deleteTblRoleSubscription = this.tblRoleService.deleteTblRole(TblRoleUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  this.router.navigateByUrl('mastertables/tblRole');
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
    this.router.navigateByUrl('mastertables/tblRole');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblRoleSubscription?.unsubscribe();
    this.deleteTblRoleSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblRole?.fldFKCompany || this.tblRole?.fldFKCompany <= 0) {
      return false;
    }

    if (!this.tblRole?.fldFKUnit || this.tblRole?.fldFKUnit <= 0) {
      return false;
    }

    if (!this.tblRole?.fldRoleName?.trim()) {
      return false;
    }

    if (!this.tblRole?.fldRole?.trim()) {
      return false;
    }

    return true;
  }

}

