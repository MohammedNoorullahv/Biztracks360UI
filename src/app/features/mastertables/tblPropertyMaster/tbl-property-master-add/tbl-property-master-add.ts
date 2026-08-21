import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { TblPropertyMasterAdd } from '../models/tblPropertyMaster-Add.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormsModule, NgForm } from '@angular/forms';
import { TblPropertyMasterService } from '../services/tbl-property-master';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tbl-property-master-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-property-master-add.html',
  styleUrl: './tbl-property-master-add.css',
})

export class TblPropertyMasterAddComponent implements OnDestroy {
  model: TblPropertyMasterAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblPropertyMasterSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  nextSlNo: number = 1;

  constructor(private tblPropertyMasterService: TblPropertyMasterService,
    private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldSlNo: 0,
      fldDescription: '',
      fldShortName: '',
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
      fldIsEditAllowed: true,
      fldIsDeleteAllowed: true,
    };
  }

  ngOnInit(): void {
    this.nextSlNo =
      this.tblPropertyMasterService.getNextSlNo();

    this.model.fldSlNo = this.nextSlNo;

    console.log('Add page Sl No =', this.nextSlNo);
  }

  OnFormSubmit(form: NgForm): void {

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (!this.model.fldSlNo || this.model.fldSlNo <= 0) {
      return;
    }

    if (!this.model.fldDescription?.trim()) {
      return;
    }

    if (!this.model.fldShortName?.trim()) {
      return;
    }

    this.addTblPropertyMasterSubscription = this.tblPropertyMasterService.addTblPropertyMaster(this.model)
      .subscribe({
        next: (response) => {
          this.toastr.success('Record saved successfully!', 'Success', {
            toastClass: 'ngx-toastr custom-toast'
          });

          if (this.submitAction === 'SaveAndAddNew') {
            this.tblPropertyMasterService.incrementNextSlNo();
            this.resetForm();
            this.cdr.detectChanges();
          } else {
            this.router.navigateByUrl('mastertables/tblPropertyMaster');
          }
        },
        error: (err) => {
          const errorMsg = err?.error?.message || err?.error || 'An unexpected error occurred';

          this.toastr.error(errorMsg, 'Error', {
            toastClass: 'ngx-toastr custom-toast error-toast'
          });

          console.error('API Error:', err);
        }
      })
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldSlNo: this.tblPropertyMasterService.getNextSlNo(),
      fldDescription: '',
      fldShortName: '',
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
      fldIsEditAllowed: true,
      fldIsDeleteAllowed: true,
    },
      setTimeout(() => {
        const firstInput = document.getElementById('fldDescription');
        if (firstInput) {
          firstInput.focus();
        }
      });
  }

  backToHome(): void {
    this.router.navigateByUrl('mastertables/tblPropertyMaster');
  }

  ngOnDestroy(): void {
    this.addTblPropertyMasterSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldSlNo || this.model.fldSlNo <= 0) {
      return false;
    }

    if (!this.model.fldDescription?.trim()) {
      return false;
    }

    if (!this.model.fldShortName?.trim()) {
      return false;
    }

    return true;
  }

}
