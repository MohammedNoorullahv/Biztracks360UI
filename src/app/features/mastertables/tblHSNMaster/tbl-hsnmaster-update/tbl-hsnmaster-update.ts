import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblHSNMaster } from '../models/tblHSNMaster.model';
import { TblHSNMasterUpdate } from '../models/tblHSNMaster-Update.model';

import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblHSNMasterService } from '../services/tbl-hsnmaster';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

@Component({
  selector: 'app-tbl-hsnmaster-update',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './tbl-hsnmaster-update.html',
  styleUrl: './tbl-hsnmaster-update.css',
})

export class TblHSNMasterUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblHSNMasterSubscription?: Subscription;
  private deleteTblHSNMasterSubscription?: Subscription;
  tblHSNMaster?: TblHSNMasterUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPropertyHSNCategory$?: Observable<TblProperty[]>;

  constructor(private tblHSNMasterService: TblHSNMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    // Declare constants upfront
    // let nFldFKHSNCategoryId: number | undefined;



    // this.tblPropertyMasterService.getActiveTblPropertyMasters().subscribe(ids => {
    //   nFldFKHSNCategoryId = ids.find(x => x.fldDescription === 'HSN Category')?.fldId;
    // });


    // //Now load tblPropertyAll$ independently
    // this.tblPropertyAll$ = this.tblPropertyService.getActiveTblPropertys();
    // this.tblPropertyHSNCategory$ = this.tblPropertyAll$.pipe(
    //   map(props => props.filter(p => p.fldFKProperty === nFldFKHSNCategoryId))
    // );

    this.tblPropertyHSNCategory$ = this.tblPropertySharedService.getPropertiesByType('HSN Category');

    // console.log('03. tblPropertyHSNCategory$ initialized:', this.tblPropertyHSNCategory$);

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
          this.tblHSNMasterService.getTblHSNMasterById(this.id)
            .subscribe({
              next: (response) => {
                this.tblHSNMaster = response;
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

    if (!this.tblHSNMaster?.fldFKHSNCategory || this.tblHSNMaster?.fldFKHSNCategory <= 0) {
      return;
    }

    if (!this.tblHSNMaster?.fldSalesCode?.trim()) {
      return;
    }

    if (!this.tblHSNMaster?.fldGSTSalesPercentage || this.tblHSNMaster?.fldGSTSalesPercentage <= 0) {
      return;
    }

    if (!this.tblHSNMaster?.fldGSTJobworkPercentage || this.tblHSNMaster?.fldGSTJobworkPercentage <= 0) {
      return;
    }

    const TblHSNMasterUpdateRequest: TblHSNMasterUpdate = {
      fldId: this.tblHSNMaster?.fldId ?? 0,
      fldFKHSNCategory: this.tblHSNMaster?.fldFKHSNCategory ?? 0,
      fldItemNames: this.tblHSNMaster?.fldItemNames ?? '',
      fldSalesCode: this.tblHSNMaster?.fldSalesCode ?? '',
      fldJobworkCode: this.tblHSNMaster?.fldJobworkCode ?? '',
      fldGSTSalesPercentage: this.tblHSNMaster?.fldGSTSalesPercentage ?? 0,
      fldGSTJobworkPercentage: this.tblHSNMaster?.fldGSTJobworkPercentage ?? 0,
      fldIsActive: this.tblHSNMaster?.fldIsActive ?? true,
      fldCreatedBy: this.tblHSNMaster?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblHSNMaster?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblHSNMaster?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblHSNMaster?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblHSNMasterSubscription = this.tblHSNMasterService.updateTblHSNMaster(TblHSNMasterUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              this.router.navigateByUrl('mastertables/tblHSNMaster');
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
          this.deleteTblHSNMasterSubscription = this.tblHSNMasterService.deleteTblHSNMaster(TblHSNMasterUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  this.router.navigateByUrl('mastertables/tblHSNMaster');
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
    this.router.navigateByUrl('mastertables/tblHSNMaster');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblHSNMasterSubscription?.unsubscribe();
    this.deleteTblHSNMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblHSNMaster?.fldFKHSNCategory || this.tblHSNMaster?.fldFKHSNCategory <= 0) {
      return false;
    }

    if (!this.tblHSNMaster?.fldSalesCode?.trim()) {
      return false;
    }

    if (!this.tblHSNMaster?.fldGSTSalesPercentage || this.tblHSNMaster?.fldGSTSalesPercentage <= 0) {
      return false;
    }

    if (!this.tblHSNMaster?.fldGSTJobworkPercentage || this.tblHSNMaster?.fldGSTJobworkPercentage <= 0) {
      return false;
    }

    return true;
  }



}

