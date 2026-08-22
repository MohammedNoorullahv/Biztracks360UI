import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblPartyMasterService } from '../services/tbl-party-master';
import { TblPartyMaster } from '../models/tblPartyMaster.model';
import { TblPartyMasterUpdate } from '../models/tblPartyMaster-Update.model';

import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblAreaMaster } from '../../tblAreaMaster/models/tblAreaMaster.model';
import { TblAreaMasterService } from '../../tblAreaMaster/services/tbl-area-master';


@Component({
  selector: 'app-tbl-party-master-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-party-master-update.html',
  styleUrl: './tbl-party-master-update.css',
})

export class TblPartyMasterUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblPartyMasterSubscription?: Subscription;
  private deleteTblPartyMasterSubscription?: Subscription;
  tblPartyMaster?: TblPartyMasterUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPropertyPartyCategory$?: Observable<TblProperty[]>;
  tblAreaMaster$?: Observable<TblAreaMaster[]>
  tblPropertyDesignation$?: Observable<TblProperty[]>;

  constructor(private tblPartyMasterService: TblPartyMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblAreaMasterService: TblAreaMasterService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {


    this.tblAreaMaster$ = this.tblAreaMasterService.getActiveTblAreaMasters();

    this.tblPropertyPartyCategory$ = this.tblPropertySharedService.getPropertiesByType('Party Category');
    this.tblPropertyDesignation$ = this.tblPropertySharedService.getPropertiesByType('Designation');


    //Now load tblPropertyAll$ independently
    // this.tblPropertyAll$ = this.tblPropertyService.getActiveTblPropertys();
    // this.tblPropertyPartyCategory$ = this.tblPropertyAll$.pipe(
    //   map(props => props.filter(p => p.fldFKProperty === nFldFKPartyCategoryId))
    // );

    // this.tblPropertyDesignation$ = this.tblPropertyAll$.pipe(
    //   map(props => props.filter(p => p.fldFKProperty === nFldFKDesignationId))
    // );

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
          this.tblPartyMasterService.getTblPartyMasterById(this.id)
            .subscribe({
              next: (response) => {
                this.tblPartyMaster = response;
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

    if (!this.tblPartyMaster?.fldFKPartyCategory || this.tblPartyMaster?.fldFKPartyCategory <= 0) {
      return;
    }

    if (!this.tblPartyMaster?.fldCode?.trim()) {
      return;
    }

    if (!this.tblPartyMaster?.fldName?.trim()) {
      return;
    }

    if (!this.tblPartyMaster?.fldAddress1?.trim()) {
      return;
    }

    if (!this.tblPartyMaster?.fldFKArea || this.tblPartyMaster?.fldFKArea <= 0) {
      return;
    }

    if (!this.tblPartyMaster?.fldFKDesignation || this.tblPartyMaster?.fldFKDesignation <= 0) {
      return;
    }

    if (!this.tblPartyMaster?.fldMobileNo?.trim()) {
      return;
    }

    const TblPartyMasterUpdateRequest: TblPartyMasterUpdate = {
      fldId: this.tblPartyMaster?.fldId ?? 0,
      fldFKPartyCategory: this.tblPartyMaster?.fldFKPartyCategory ?? 0,
      fldCode: this.tblPartyMaster?.fldCode ?? '',
      fldName: this.tblPartyMaster?.fldName ?? '',
      fldShortName: this.tblPartyMaster?.fldShortName ?? '',
      fldAddress1: this.tblPartyMaster?.fldAddress1 ?? '',
      fldAddress2: this.tblPartyMaster?.fldAddress2 ?? '',
      fldFKArea: this.tblPartyMaster?.fldFKArea ?? 0,
      fldState: this.tblPartyMaster?.fldState ?? '',
      fldCity: this.tblPartyMaster?.fldCity ?? '',
      fldArea: this.tblPartyMaster?.fldArea ?? '',
      fldPincode: this.tblPartyMaster?.fldPincode ?? '',
      fldStateCode: this.tblPartyMaster?.fldStateCode ?? '',
      fldPANNo: this.tblPartyMaster?.fldPANNo ?? '',
      fldGSTNo: this.tblPartyMaster?.fldGSTNo ?? '',
      fldContactPersonName: this.tblPartyMaster?.fldContactPersonName ?? '',
      fldFKDesignation: this.tblPartyMaster?.fldFKDesignation ?? 0,
      fldMobileNo: this.tblPartyMaster?.fldMobileNo ?? '',
      fldMailId: this.tblPartyMaster?.fldMailId ?? '',
      fldImagePath: this.tblPartyMaster?.fldImagePath ?? '',
      fldIsActive: this.tblPartyMaster?.fldIsActive ?? true,
      fldCreatedBy: this.tblPartyMaster?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblPartyMaster?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblPartyMaster?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblPartyMaster?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblPartyMasterSubscription = this.tblPartyMasterService.updateTblPartyMaster(TblPartyMasterUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              this.router.navigateByUrl('mastertables/tblPartyMaster');
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
          this.deleteTblPartyMasterSubscription = this.tblPartyMasterService.deleteTblPartyMaster(TblPartyMasterUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  this.router.navigateByUrl('mastertables/tblPartyMaster');
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

  onSelectChange(event: Event, targetField: keyof TblPartyMaster): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.tblPartyMaster as any)[targetField] = selectedText;
  }

  backToHome(): void {
    this.router.navigateByUrl('mastertables/tblPartyMaster');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblPartyMasterSubscription?.unsubscribe();
    this.deleteTblPartyMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblPartyMaster?.fldFKPartyCategory || this.tblPartyMaster?.fldFKPartyCategory <= 0) {
      return false;
    }

    if (!this.tblPartyMaster?.fldCode?.trim()) {
      return false;
    }

    if (!this.tblPartyMaster?.fldName?.trim()) {
      return false;
    }

    if (!this.tblPartyMaster?.fldAddress1?.trim()) {
      return false;
    }

    if (!this.tblPartyMaster?.fldFKArea || this.tblPartyMaster?.fldFKArea <= 0) {
      return false;
    }

    if (!this.tblPartyMaster?.fldFKDesignation || this.tblPartyMaster?.fldFKDesignation <= 0) {
      return false;
    }

    if (!this.tblPartyMaster?.fldMobileNo?.trim()) {
      return false;
    }

    return true;
  }

}

