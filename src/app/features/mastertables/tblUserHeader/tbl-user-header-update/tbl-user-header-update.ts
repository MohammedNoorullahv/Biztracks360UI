import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblUserHeaderService } from '../services/tbl-user-header';
import { TblUserHeader } from '../models/tblUserHeader.model';
import { TblUserHeaderUpdate } from '../models/tblUserHeader-Update.model';

// import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-Property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblCompanyMaster } from '../../tblCompanyMaster/models/tblCompanyMaster.model';
import { TblCompanyMasterService } from '../../tblCompanyMaster/services/tbl-company-master';
import { TblUnitMaster } from '../../tblUnitMaster/models/tblUnitMaster.model';
import { TblUnitMasterService } from '../../tblUnitMaster/services/tbl-unit-master';
import { TblRole } from '../../tblRole/models/tblRole.model';
import { TblRoleService } from '../../tblRole/services/tbl-role';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';



@Component({
  selector: 'app-tbl-user-header-update',
  imports: [CommonModule, FormsModule
  ],
  templateUrl: './tbl-user-header-update.html',
  styleUrl: './tbl-user-header-update.css',
})

export class TblUserHeaderUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblUserHeaderSubscription?: Subscription;
  private deleteTblUserHeaderSubscription?: Subscription;
  tblUserHeader?: TblUserHeaderUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblCompanyMaster$?: Observable<TblCompanyMaster[]>
  tblUnitMaster$?: Observable<TblUnitMaster[]>
  tblPropertyUsertype$?: Observable<TblProperty[]>;
  tblPropertyDesignation$?: Observable<TblProperty[]>;
  tblRole$?: Observable<TblRole[]>

  constructor(private tblUserHeaderService: TblUserHeaderService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblCompanyMasterService: TblCompanyMasterService,
    private tblUnitMasterService: TblUnitMasterService,
    private tblRoleService: TblRoleService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {


    this.tblCompanyMaster$ = this.tblCompanyMasterService.getActiveTblCompanyMasters();
    this.tblUnitMaster$ = this.tblUnitMasterService.getActiveTblUnitMasters();
    this.tblRole$ = this.tblRoleService.getActiveTblRoles();

    this.tblPropertyUsertype$ = this.tblPropertySharedService.getPropertiesByType('Usertype');
    this.tblPropertyDesignation$ = this.tblPropertySharedService.getPropertiesByType('Designation');


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
          this.tblUserHeaderService.getTblUserHeaderById(this.id)
            .subscribe({
              next: (response) => {
                this.tblUserHeader = response;
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

    if (!this.tblUserHeader?.fldFKCompany || this.tblUserHeader?.fldFKCompany <= 0) {
      return;
    }

    if (!this.tblUserHeader?.fldFKUnit || this.tblUserHeader?.fldFKUnit <= 0) {
      return;
    }

    if (!this.tblUserHeader?.fldUsername?.trim()) {
      return;
    }

    if (!this.tblUserHeader?.fldLoginMailId?.trim()) {
      return;
    }

    if (!this.tblUserHeader?.fldPassword?.trim()) {
      return;
    }

    if (!this.tblUserHeader?.fldFKUsertype || this.tblUserHeader?.fldFKUsertype <= 0) {
      return;
    }

    if (!this.tblUserHeader?.fldFKDesignation || this.tblUserHeader?.fldFKDesignation <= 0) {
      return;
    }

    if (!this.tblUserHeader?.fldFKRole || this.tblUserHeader?.fldFKRole <= 0) {
      return;
    }

    const TblUserHeaderUpdateRequest: TblUserHeaderUpdate = {
      fldId: this.tblUserHeader?.fldId ?? 0,
      fldFKCompany: this.tblUserHeader?.fldFKCompany ?? 0,
      fldFKUnit: this.tblUserHeader?.fldFKUnit ?? 0,
      fldUsername: this.tblUserHeader?.fldUsername ?? '',
      fldLoginMailId: this.tblUserHeader?.fldLoginMailId ?? '',
      fldPassword: this.tblUserHeader?.fldPassword ?? '',
      fldFKUsertype: this.tblUserHeader?.fldFKUsertype ?? 0,
      fldFKDesignation: this.tblUserHeader?.fldFKDesignation ?? 0,
      fldFKRole: this.tblUserHeader?.fldFKRole ?? 0,
      fldAspNetUserId: this.tblUserHeader?.fldAspNetUserId ?? '',
      fldContactNo: this.tblUserHeader?.fldContactNo ?? '',
      fldSignature: this.tblUserHeader?.fldSignature ?? '',
      fldReceiveLoginAlert: this.tblUserHeader?.fldReceiveLoginAlert ?? true,
      fldCheckLoginIP: this.tblUserHeader?.fldCheckLoginIP ?? true,
      fldUserMacID: this.tblUserHeader?.fldUserMacID ?? '',
      fldIsActive: this.tblUserHeader?.fldIsActive ?? true,
      fldCreatedBy: this.tblUserHeader?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblUserHeader?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblUserHeader?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblUserHeader?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblUserHeaderSubscription = this.tblUserHeaderService.updateTblUserHeader(TblUserHeaderUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              this.router.navigateByUrl('mastertables/tblUserHeader');
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
          this.deleteTblUserHeaderSubscription = this.tblUserHeaderService.deleteTblUserHeader(TblUserHeaderUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  this.router.navigateByUrl('mastertables/tblUserHeader');
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
    this.router.navigateByUrl('mastertables/tblUserHeader');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblUserHeaderSubscription?.unsubscribe();
    this.deleteTblUserHeaderSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblUserHeader?.fldFKCompany || this.tblUserHeader?.fldFKCompany <= 0) {
      return false;
    }

    if (!this.tblUserHeader?.fldFKUnit || this.tblUserHeader?.fldFKUnit <= 0) {
      return false;
    }

    if (!this.tblUserHeader?.fldUsername?.trim()) {
      return false;
    }

    if (!this.tblUserHeader?.fldLoginMailId?.trim()) {
      return false;
    }

    if (!this.tblUserHeader?.fldPassword?.trim()) {
      return false;
    }

    if (!this.tblUserHeader?.fldFKUsertype || this.tblUserHeader?.fldFKUsertype <= 0) {
      return false;
    }

    if (!this.tblUserHeader?.fldFKDesignation || this.tblUserHeader?.fldFKDesignation <= 0) {
      return false;
    }

    if (!this.tblUserHeader?.fldFKRole || this.tblUserHeader?.fldFKRole <= 0) {
      return false;
    }

    return true;
  }

}

