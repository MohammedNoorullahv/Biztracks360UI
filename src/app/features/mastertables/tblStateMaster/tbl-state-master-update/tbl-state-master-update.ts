import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

// import { TblStateMasterService } from '../services/tbl-state-master.service';

import { TblStateMasterUpdate } from '../models/tblStateMaster-Update.model';
import { TblStateMasterService } from '../services/tbl-state-master';

@Component({
  selector: 'app-tbl-state-master-update',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './tbl-state-master-update.html',
  styleUrl: './tbl-state-master-update.css',
})


export class TblStateMasterUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblStateMasterSubscription?: Subscription;
  private deleteTblStateMasterSubscription?: Subscription;
  tblStateMaster?: TblStateMasterUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  constructor(private tblStateMasterService: TblStateMasterService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.paramSubscription = combineLatest([
      this.route.paramMap,
      this.route.queryParams
    ])
      .subscribe(([params, queryParams]) => {
        const idParam = params.get('id');
        this.id = idParam ? parseInt(idParam, 10) : null;
        this.actionType = queryParams['action'];

        if (this.id) {
          this.tblStateMasterService.getTblStateMasterById(this.id)
            .subscribe({
              next: (response) => {
                this.tblStateMaster = response;
                this.cdr.detectChanges();
              }
            });
        }
      });
  }
  OnFormSubmit(): void {
    const TblStateMasterUpdateRequest: TblStateMasterUpdate = {
      fldId: this.tblStateMaster?.fldId ?? 0,
      fldStateName: this.tblStateMaster?.fldStateName ?? '',
      fldStateCode: this.tblStateMaster?.fldStateCode ?? '',
      fldShortName: this.tblStateMaster?.fldShortName ?? '',
      fldIsActive: this.tblStateMaster?.fldIsActive ?? true,
      fldCreatedBy: this.tblStateMaster?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblStateMaster?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblStateMaster?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblStateMaster?.fldModifiedDt ?? new Date(),
    }
    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblStateMasterSubscription = this.tblStateMasterService.updateTblStateMaster(TblStateMasterUpdateRequest)
          .subscribe({
            next: (Response) => {
              this.router.navigateByUrl('mastertables/tblStateMaster');
            }
          });
      } else {
        const proceed = confirm('R U Sure, U Want to Delete the selected Record?');

        if (proceed) {
          this.deleteTblStateMasterSubscription = this.tblStateMasterService.deleteTblStateMaster(TblStateMasterUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.router.navigateByUrl('mastertables/tblStateMaster');
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
    this.router.navigateByUrl('mastertables/tblStateMaster');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblStateMasterSubscription?.unsubscribe();
    this.deleteTblStateMasterSubscription?.unsubscribe();
  }

}

