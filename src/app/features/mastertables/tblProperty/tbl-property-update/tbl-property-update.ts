import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblPropertyService } from '../services/tbl-property';
import { TblProperty } from '../models/tblProperty.model';
import { TblPropertyUpdate } from '../models/tblProperty-Update.model';

import { TblPropertyMaster } from '../../tblPropertyMaster/models/tblPropertyMaster.model';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';

@Component({
  selector: 'app-tbl-property-update',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './tbl-property-update.html',
  styleUrl: './tbl-property-update.css',
})

export class TblPropertyUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblPropertySubscription?: Subscription;
  private deleteTblPropertySubscription?: Subscription;
  tblProperty?: TblPropertyUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  tblPropertyMaster$?: Observable<TblPropertyMaster[]>

  constructor(private tblPropertyService: TblPropertyService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    // Declare constants upfront


    this.tblPropertyMaster$ = this.tblPropertyMasterService.getActiveTblPropertyMasters();



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
          this.tblPropertyService.getTblPropertyById(this.id)
            .subscribe({
              next: (response) => {
                this.tblProperty = response;
                this.cdr.detectChanges();
              }
            });
        }
      });
  }
  
  OnFormSubmit(): void {
    const TblPropertyUpdateRequest: TblPropertyUpdate = {
      fldId: this.tblProperty?.fldId ?? 0,
      fldFKProperty: this.tblProperty?.fldFKProperty ?? 0,
      fldSlNo: this.tblProperty?.fldSlNo ?? 0,
      fldDescription: this.tblProperty?.fldDescription ?? '',
      fldShortName: this.tblProperty?.fldShortName ?? '',
      fldSetAsDefault: this.tblProperty?.fldSetAsDefault ?? true,
      fldIsActive: this.tblProperty?.fldIsActive ?? true,
      fldCreatedBy: this.tblProperty?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblProperty?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblProperty?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblProperty?.fldModifiedDt ?? new Date(),
    }
    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblPropertySubscription = this.tblPropertyService.updateTblProperty(TblPropertyUpdateRequest)
          .subscribe({
            next: (Response) => {
              // After successful save, refresh shared cache
              // this.TblPropertySharedService.refreshProperties();

              this.router.navigateByUrl('mastertables/tblProperty');
            }
          });
      } else {
        const proceed = confirm('R U Sure, U Want to Delete the selected Record?');

        if (proceed) {
          this.deleteTblPropertySubscription = this.tblPropertyService.deleteTblProperty(TblPropertyUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.router.navigateByUrl('mastertables/tblProperty');
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
    this.router.navigateByUrl('mastertables/tblProperty');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblPropertySubscription?.unsubscribe();
    this.deleteTblPropertySubscription?.unsubscribe();
  }

}
