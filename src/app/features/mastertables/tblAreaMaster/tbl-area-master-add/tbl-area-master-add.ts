import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TblProperty } from '../../tblProperty/models/tblProperty.model';

import { TblStateMaster } from '../../tblStateMaster/models/tblStateMaster.model';
import { TblAreaMasterAdd } from '../models/tblAreaMaster-Add.model';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblAreaMasterService } from '../services/tbl-area-master';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';
import { TblStateMasterService } from '../../tblStateMaster/services/tbl-state-master';

@Component({
  selector: 'app-tbl-area-master-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-area-master-add.html',
  styleUrl: './tbl-area-master-add.css',
})

export class TblAreaMasterAddComponent implements OnDestroy {
  model: TblAreaMasterAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblAreaMasterSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblStateMaster$?: Observable<TblStateMaster[]>
  tblPropertyCity$?: Observable<TblProperty[]>;
  tblPropertyArea$?: Observable<TblProperty[]>;
  tblPropertyPincode$?: Observable<TblProperty[]>;

  constructor(private tblAreaMasterService: TblAreaMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertyService: TblPropertyService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblStateMasterService: TblStateMasterService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKState: 0,
      fldState: '',
      fldFKCity: 0,
      fldCity: '',
      fldFKArea: 0,
      fldArea: '',
      fldFKPincode: 0,
      fldPincode: '',
      fldStateCode: 0,
      fldStateShortCode: '',
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.tblPropertyCity$ = this.tblPropertySharedService.getPropertiesByType('City');
    this.tblPropertyArea$ = this.tblPropertySharedService.getPropertiesByType('Area');
    this.tblPropertyPincode$ = this.tblPropertySharedService.getPropertiesByType('Pincode');


    this.tblStateMaster$ = this.tblStateMasterService.getActiveLeanTblStateMasters();



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

    if (!this.model.fldFKState || this.model.fldFKState <= 0) {
      return;
    }

    if (!this.model.fldFKCity || this.model.fldFKCity <= 0) {
      return;
    }

    if (!this.model.fldFKArea || this.model.fldFKArea <= 0) {
      return;
    }

    if (!this.model.fldFKPincode || this.model.fldFKPincode <= 0) {
      return;
    }

    // if (!this.model.fldStateCode || this.model.fldStateCode <= 0) {
    //   return;
    // }

    this.isSaving = true;

    this.addTblAreaMasterSubscription = this.tblAreaMasterService.addTblAreaMaster(this.model)
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
            this.router.navigateByUrl('mastertables/tblAreaMaster');
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

  onSelectChange(event: Event, targetField: keyof TblAreaMasterAdd): void {

    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.model as any)[targetField] = selectedText;
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldFKState: 0,
      fldState: '',
      fldFKCity: 0,
      fldCity: '',
      fldFKArea: 0,
      fldArea: '',
      fldFKPincode: 0,
      fldPincode: '',
      fldStateCode: 0,
      fldStateShortCode: '',
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
    this.router.navigateByUrl('mastertables/tblAreaMaster');
  }

  ngOnDestroy(): void {
    this.addTblAreaMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKState || this.model.fldFKState <= 0) {
      return false;
    }

    if (!this.model.fldFKCity || this.model.fldFKCity <= 0) {
      return false;
    }

    if (!this.model.fldFKArea || this.model.fldFKArea <= 0) {
      return false;
    }

    if (!this.model.fldFKPincode || this.model.fldFKPincode <= 0) {
      return false;
    }

    // if (!this.model.fldStateCode || this.model.fldStateCode <= 0) {
    //   return false;
    // }

    return true;
  }

}

