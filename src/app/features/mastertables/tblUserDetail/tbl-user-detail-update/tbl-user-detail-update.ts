import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblUserDetailService } from '../services/tbl-user-detail';
import { TblUserDetail } from '../models/tblUserDetail.model';
import { TblUserDetailUpdate } from '../models/tblUserDetail-Update.model';

import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblUserHeader } from '../../tblUserHeader/models/tblUserHeader.model';
import { TblUserHeaderService } from '../../tblUserHeader/services/tbl-user-header';
import { TblMenuMaster } from '../../tblMenuMaster/models/tblMenuMaster.model';
import { TblMenuMasterService } from '../../tblMenuMaster/services/tbl-menu-master';


@Component({
  selector: 'app-tbl-user-detail-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-user-detail-update.html',
  styleUrl: './tbl-user-detail-update.css',
})

export class TblUserDetailUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblUserDetailSubscription?: Subscription;
  private deleteTblUserDetailSubscription?: Subscription;
  tblUserDetail?: TblUserDetailUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit
  fldFKUser: number | null = null;

  @ViewChild('form') form!: NgForm;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblUserHeader$?: Observable<TblUserHeader[]>
  tblMenuMaster$?: Observable<TblMenuMaster[]>
  tblPropertyMenuCategory$?: Observable<TblProperty[]>;

  constructor(private tblUserDetailService: TblUserDetailService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblUserHeaderService: TblUserHeaderService,
    private tblMenuMasterService: TblMenuMasterService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    const fldFKUserParam =
      this.route.snapshot.paramMap.get('fldFKUser');


    if (fldFKUserParam) {

      this.fldFKUser =
        parseInt(fldFKUserParam, 10);

      // this.tblUserDetail.fldFKUser =
      //   this.fldFKUser;
    }


    // this.tblUserHeader$ = this.tblUserHeaderService.getActiveTblUserHeaders();
    this.tblMenuMaster$ = this.tblMenuMasterService.getActiveTblMenuMasters();

    this.tblPropertyMenuCategory$ = this.tblPropertySharedService.getPropertiesByType('Menu Category');


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
          this.tblUserDetailService.getTblUserDetailById(this.id)
            .subscribe({
              next: (response) => {
                this.tblUserDetail = response;
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


    if (!this.tblUserDetail?.fldFKMenuMaster || this.tblUserDetail?.fldFKMenuMaster <= 0) {
      return;
    }



    const TblUserDetailUpdateRequest: TblUserDetailUpdate = {
      fldId: this.tblUserDetail?.fldId ?? 0,
      fldFKUser: this.tblUserDetail?.fldFKUser ?? 0,
      fldFKMenuMaster: this.tblUserDetail?.fldFKMenuMaster ?? 0,
      fldCondition: this.tblUserDetail?.fldCondition ?? '',
      fldFKMenuCategory: this.tblUserDetail?.fldFKMenuCategory ?? 0,
      fldFKRole: this.tblUserDetail?.fldFKRole ?? 0,
      fldRoleName: this.tblUserDetail?.fldRoleName ?? '',
      fldRole: this.tblUserDetail?.fldRole ?? '',
      fldMenuRoleCode: this.tblUserDetail?.fldMenuRoleCode ?? '',
      fldIsActive: this.tblUserDetail?.fldIsActive ?? true,
      fldCreatedBy: this.tblUserDetail?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblUserDetail?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblUserDetail?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblUserDetail?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblUserDetailSubscription = this.tblUserDetailService.updateTblUserDetail(TblUserDetailUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              if (this.fldFKUser === null) {
                return;
              }

              this.router.navigate(['/mastertables/tblUserDetail', this.fldFKUser]);
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
          this.deleteTblUserDetailSubscription = this.tblUserDetailService.deleteTblUserDetail(TblUserDetailUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  // this.router.navigateByUrl('mastertables/tblUserDetail');

                  if (this.fldFKUser === null) {
                    return;
                  }

                  this.router.navigate(['/mastertables/tblUserDetail', this.fldFKUser]);
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

  onSelectChange(event: Event, targetField: keyof TblUserDetail): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.tblUserDetail as any)[targetField] = selectedText;
  }

  backToHome(): void {

    if (this.fldFKUser === null) {
      return;
    }

    this.router.navigate([
      '/mastertables/tblUserDetail',
      this.fldFKUser
    ]);

    // this.router.navigateByUrl('mastertables/tblUserDetail');
    // return this.http.get<TblUserDetail[]>(`${environment.apiBaseUrl}/api/TblUserDetail/GetActiveLeanTblUserDetails?FldFKUser=${fldFKUser}`);
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblUserDetailSubscription?.unsubscribe();
    this.deleteTblUserDetailSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblUserDetail?.fldFKUser || this.tblUserDetail?.fldFKUser <= 0) {
      return false;
    }

    if (!this.tblUserDetail?.fldFKMenuMaster || this.tblUserDetail?.fldFKMenuMaster <= 0) {
      return false;
    }

    if (!this.tblUserDetail?.fldFKMenuCategory || this.tblUserDetail?.fldFKMenuCategory <= 0) {
      return false;
    }

    if (!this.tblUserDetail?.fldFKRole || this.tblUserDetail?.fldFKRole <= 0) {
      return false;
    }

    return true;
  }

}
