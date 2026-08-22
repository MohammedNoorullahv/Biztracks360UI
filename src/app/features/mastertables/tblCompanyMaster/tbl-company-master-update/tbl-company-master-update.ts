import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblCompanyMasterService } from '../services/tbl-company-master';
import { TblCompanyMaster } from '../models/tblCompanyMaster.model';
import { TblCompanyMasterUpdate } from '../models/tblCompanyMaster-Update.model';

import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';

import { TblAreaMaster } from '../../tblAreaMaster/models/tblAreaMaster.model';
import { TblAreaMasterService } from '../../tblAreaMaster/services/tbl-area-master';


@Component({
  selector: 'app-tbl-company-master-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-company-master-update.html',
  styleUrl: './tbl-company-master-update.css',
})

export class TblCompanyMasterUpdateComponent implements OnInit, OnDestroy {
  id: number | null = null;
  paramSubscription?: Subscription;
  private editTblCompanyMasterSubscription?: Subscription;
  private deleteTblCompanyMasterSubscription?: Subscription;
  tblCompanyMaster?: TblCompanyMasterUpdate;
  actionType: string = '';
  submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

  @ViewChild('form') form!: NgForm;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPropertyUnitType$?: Observable<TblProperty[]>;
  tblAreaMaster$?: Observable<TblAreaMaster[]>
  tblPropertyDesignation$?: Observable<TblProperty[]>;

  constructor(private tblCompanyMasterService: TblCompanyMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblAreaMasterService: TblAreaMasterService,
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    // Declare constants upfront
    let nFldFKUnitTypeId: number | undefined;
    let nFldFKDesignationId: number | undefined;


    this.tblAreaMaster$ = this.tblAreaMasterService.getActiveTblAreaMasters();

    this.tblPropertyMasterService.getActiveTblPropertyMasters().subscribe(ids => {
      nFldFKUnitTypeId = ids.find(x => x.fldDescription === 'Unit Type')?.fldId;
      nFldFKDesignationId = ids.find(x => x.fldDescription === 'Designation')?.fldId;
    });


    //Now load tblPropertyAll$ independently
    this.tblPropertyAll$ = this.tblPropertyService.getActiveTblPropertys();
    this.tblPropertyUnitType$ = this.tblPropertyAll$.pipe(
      map(props => props.filter(p => p.fldFKProperty === nFldFKUnitTypeId))
    );

    this.tblPropertyDesignation$ = this.tblPropertyAll$.pipe(
      map(props => props.filter(p => p.fldFKProperty === nFldFKDesignationId))
    );

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
          this.tblCompanyMasterService.getTblCompanyMasterById(this.id)
            .subscribe({
              next: (response) => {
                this.tblCompanyMaster = response;
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

    if (!this.tblCompanyMaster?.fldFKUnitType || this.tblCompanyMaster?.fldFKUnitType <= 0) {
      return;
    }

    if (!this.tblCompanyMaster?.fldCode?.trim()) {
      return;
    }

    if (!this.tblCompanyMaster?.fldName?.trim()) {
      return;
    }

    if (!this.tblCompanyMaster?.fldAddress1?.trim()) {
      return;
    }

    if (!this.tblCompanyMaster?.fldFKArea || this.tblCompanyMaster?.fldFKArea <= 0) {
      return;
    }

    if (!this.tblCompanyMaster?.fldFKDesignation || this.tblCompanyMaster?.fldFKDesignation <= 0) {
      return;
    }

    if (!this.tblCompanyMaster?.fldMobileNo?.trim()) {
      return;
    }

    const TblCompanyMasterUpdateRequest: TblCompanyMasterUpdate = {
      fldId: this.tblCompanyMaster?.fldId ?? 0,
      fldFKUnitType: this.tblCompanyMaster?.fldFKUnitType ?? 0,
      fldCode: this.tblCompanyMaster?.fldCode ?? '',
      fldName: this.tblCompanyMaster?.fldName ?? '',
      fldShortName: this.tblCompanyMaster?.fldShortName ?? '',
      fldAddress1: this.tblCompanyMaster?.fldAddress1 ?? '',
      fldAddress2: this.tblCompanyMaster?.fldAddress2 ?? '',
      fldFKArea: this.tblCompanyMaster?.fldFKArea ?? 0,
      fldState: this.tblCompanyMaster?.fldState ?? '',
      fldCity: this.tblCompanyMaster?.fldCity ?? '',
      fldArea: this.tblCompanyMaster?.fldArea ?? '',
      fldPincode: this.tblCompanyMaster?.fldPincode ?? '',
      fldStateCode: this.tblCompanyMaster?.fldStateCode ?? '',
      fldPANNo: this.tblCompanyMaster?.fldPANNo ?? '',
      fldGSTNo: this.tblCompanyMaster?.fldGSTNo ?? '',
      fldContactPersonName: this.tblCompanyMaster?.fldContactPersonName ?? '',
      fldFKDesignation: this.tblCompanyMaster?.fldFKDesignation ?? 0,
      fldMobileNo: this.tblCompanyMaster?.fldMobileNo ?? '',
      fldMailId: this.tblCompanyMaster?.fldMailId ?? '',
      fldImagePath: this.tblCompanyMaster?.fldImagePath ?? '',
      fldIsActive: this.tblCompanyMaster?.fldIsActive ?? true,
      fldCreatedBy: this.tblCompanyMaster?.fldCreatedBy ?? 0,
      fldCreatedDt: this.tblCompanyMaster?.fldCreatedDt ?? new Date(),
      fldModifiedBy: this.tblCompanyMaster?.fldModifiedBy ?? 0,
      fldModifiedDt: this.tblCompanyMaster?.fldModifiedDt ?? new Date(),
    };

    if (this.id) {
      if (this.submitAction === 'Edit') {
        this.editTblCompanyMasterSubscription = this.tblCompanyMasterService.updateTblCompanyMaster(TblCompanyMasterUpdateRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success('Record updated successfully!', 'Success', {
                toastClass: 'ngx-toastr custom-toast'
              });

              this.router.navigateByUrl('mastertables/tblCompanyMaster');
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
          this.deleteTblCompanyMasterSubscription = this.tblCompanyMasterService.deleteTblCompanyMaster(TblCompanyMasterUpdateRequest)
            .subscribe({
              next: (response) => {
                if (response.status === 200) {
                  this.toastr.success('Record deleted successfully!', 'Success', {
                    toastClass: 'ngx-toastr custom-toast'
                  });

                  this.router.navigateByUrl('mastertables/tblCompanyMaster');
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

  onSelectChange(event: Event, targetField: keyof TblCompanyMaster): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.tblCompanyMaster as any)[targetField] = selectedText;
  }

  backToHome(): void {
    this.router.navigateByUrl('mastertables/tblCompanyMaster');
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editTblCompanyMasterSubscription?.unsubscribe();
    this.deleteTblCompanyMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldFKUnitType || this.tblCompanyMaster?.fldFKUnitType <= 0) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldCode?.trim()) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldName?.trim()) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldAddress1?.trim()) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldFKArea || this.tblCompanyMaster?.fldFKArea <= 0) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldFKDesignation || this.tblCompanyMaster?.fldFKDesignation <= 0) {
      return false;
    }

    if (!this.tblCompanyMaster?.fldMobileNo?.trim()) {
      return false;
    }

    return true;
  }

}

