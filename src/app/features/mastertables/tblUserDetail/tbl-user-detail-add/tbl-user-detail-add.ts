import { Component, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

import { TblUserHeader } from '../../tblUserHeader/models/tblUserHeader.model';
import { TblUserHeaderService } from '../../tblUserHeader/services/tbl-user-header';
import { TblMenuMaster } from '../../tblMenuMaster/models/tblMenuMaster.model';
import { TblMenuMasterService } from '../../tblMenuMaster/services/tbl-menu-master';

import { TblUserDetail } from '../models/tblUserDetail.model';
import { TblUserDetailAdd } from '../models/tblUserDetail-Add.model';
import { TblUserDetailService } from '../services/tbl-user-detail';


@Component({
  selector: 'app-tbl-user-detail-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './tbl-user-detail-add.html',
  styleUrl: './tbl-user-detail-add.css',
})

export class TblUserDetailAddComponent implements OnDestroy {
  model: TblUserDetailAdd;
  submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
  private addTblUserDetailSubscription?: Subscription;
  @ViewChild('form') form!: NgForm;
  isSaving: boolean = false;
  fldFKUser: number | null = null;

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
    private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.model = {
      fldId: 0,
      fldFKUser: 0,
      fldFKMenuMaster: 0,
      fldCondition: '',
      fldFKMenuCategory: 0,
      fldFKRole: 0,
      fldRoleName: '',
      fldRole: '',
      fldMenuRoleCode: '',
      fldIsActive: true,
      fldCreatedBy: 0,
      fldCreatedDt: new Date(),
    };
  }

  ngOnInit(): void {
    const fldFKUserParam =
      this.route.snapshot.paramMap.get('fldFKUser');


    if (fldFKUserParam) {

      this.fldFKUser =
        parseInt(fldFKUserParam, 10);

      this.model.fldFKUser =
        this.fldFKUser;
    }


    this.tblPropertyMenuCategory$ = this.tblPropertySharedService.getPropertiesByType('Menu Category');


    // this.tblUserHeader$ = this.tblUserHeaderService.getActiveLeanTblUserHeaders();
    this.tblMenuMaster$ = this.tblMenuMasterService.getActiveLeanTblMenuMasters();



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


    // if (!this.model.fldFKUser || this.model.fldFKUser <= 0) {
    //   return;
    // }

    if (!this.model.fldFKMenuMaster || this.model.fldFKMenuMaster <= 0) {
      return;
    }

    this.isSaving = true;


    this.addTblUserDetailSubscription = this.tblUserDetailService.addTblUserDetail(this.model)
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
            // this.router.navigateByUrl('mastertables/tblUserDetail/:fldFKUser');

            // if (this.fldFKUser === null) {
            //   return;
            // }

            this.router.navigate([
              '/mastertables/tblUserDetail',
              this.fldFKUser
            ]);

            //return this.http.get<TblUserDetail[]>(`${environment.apiBaseUrl}/api/TblUserDetail/GetActiveLeanTblUserDetails?FldFKUser=${fldFKUser}`);
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

  onSelectChange(event: Event, targetField: keyof TblUserDetail): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;

    // Assign the text to the correct field ()
    (this.model as any)[targetField] = selectedText;
  }

  resetForm() {
    this.model = {
      fldId: 0,
      fldFKUser: 0,
      fldFKMenuMaster: 0,
      fldCondition: '',
      fldFKMenuCategory: 0,
      fldFKRole: 0,
      fldRoleName: '',
      fldRole: '',
      fldMenuRoleCode: '',
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

    if (this.fldFKUser === null) {
      return;
    }

    this.router.navigate([
      '/mastertables/tblUserDetail',
      this.fldFKUser
    ]);
  }

  ngOnDestroy(): void {
    this.addTblUserDetailSubscription?.unsubscribe();
  }

  isFormValid(form: any): boolean {

    if (form.invalid) {
      return false;
    }

    if (!this.model.fldFKUser || this.model.fldFKUser <= 0) {
      return false;
    }

    if (!this.model.fldFKMenuMaster || this.model.fldFKMenuMaster <= 0) {
      return false;
    }



    return true;
  }

}

