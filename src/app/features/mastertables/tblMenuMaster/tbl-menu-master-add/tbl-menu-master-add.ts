import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TblMenuMasterAdd } from '../models/tblMenuMaster-Add.model';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblMenuMasterService } from '../services/tbl-menu-master';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';
import { TblMenuMaster } from '../models/tblMenuMaster.model';


@Component({
  selector: 'app-tbl-menu-master-add',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './tbl-menu-master-add.html',
  styleUrl: './tbl-menu-master-add.css',
})

export class TblMenuMasterAddComponent implements OnDestroy {
  model: TblMenuMasterAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblMenuMasterSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;

  tblPropertyAll$?: Observable<TblProperty[]>;

  tblPropertyCategory$?: Observable<TblProperty[]>;

  constructor(private tblMenuMasterService: TblMenuMasterService,
    private tblPropertyMasterService: TblPropertyMasterService,
    private tblPropertySharedService: TblPropertySharedservice,
    private tblPropertyService: TblPropertyService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldTableOrView: '',
      fldFKCategory: 0,
      fldCategory: '',
      fldMenuName: '',
      fldTableOrViewName: '',
      fldCondition: '',
      fldRoleOfTheMenu: '',
      fldControllerName: '',
      fldIcon: '',
      fldIsProcessProgram: true,
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    this.tblPropertyCategory$ = this.tblPropertySharedService.getPropertiesByType('Category');

    let nFldFKCategoryId: number | undefined = 0;

    this.tblPropertyMasterService.getActiveTblPropertyMasters().subscribe(ids => {
      nFldFKCategoryId = ids.find(x => x.fldDescription === 'Category')?.fldId;
    });


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

    if (!this.model.fldTableOrView?.trim()) {
      return;
    }

    if (!this.model.fldFKCategory || this.model.fldFKCategory <= 0) {
      return;
    }

    if (!this.model.fldCategory?.trim()) {
      return;
    }

    if (!this.model.fldMenuName?.trim()) {
      return;
    }

    if (!this.model.fldTableOrViewName?.trim()) {
      return;
    }

    this.isSaving = true;

    this.addTblMenuMasterSubscription = this.tblMenuMasterService.addTblMenuMaster(this.model)
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
            this.router.navigateByUrl('mastertables/tblMenuMaster');
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




  onSelectChange(event: Event, targetField: keyof TblMenuMaster): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.model as any)[targetField] = selectedText;
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldTableOrView: '',
      fldFKCategory: 0,
      fldCategory: '',
      fldMenuName: '',
      fldTableOrViewName: '',
      fldCondition: '',
      fldRoleOfTheMenu: '',
      fldControllerName: '',
      fldIcon: '',
      fldIsProcessProgram: true,
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
    this.router.navigateByUrl('mastertables/tblMenuMaster');
  }

  ngOnDestroy(): void {
    this.addTblMenuMasterSubscription?.unsubscribe();
  }



  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldTableOrView?.trim()) {
      return false;
    }

    if (!this.model.fldFKCategory || this.model.fldFKCategory <= 0) {
      return false;
    }

    if (!this.model.fldCategory?.trim()) {
      return false;
    }

    if (!this.model.fldMenuName?.trim()) {
      return false;
    }

    if (!this.model.fldTableOrViewName?.trim()) {
      return false;
    }

    return true;
  }

}
