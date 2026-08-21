import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TblPropertyMaster } from '../../tblPropertyMaster/models/tblPropertyMaster.model';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../services/tbl-property';
import { TblPropertyAdd } from '../models/tblProperty-Add.model';
import { TblPropertySharedservice } from '../../../../shared/services/tbl-property-shared';

@Component({
	selector: 'app-tbl-property-add',
	imports: [
		CommonModule,
		FormsModule
	],
	templateUrl: './tbl-property-add.html',
	styleUrl: './tbl-property-add.css',
})

export class TblPropertyAddComponent implements OnDestroy {
	model: TblPropertyAdd;
	submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
	private addTblPropertySubscription?: Subscription;
	@ViewChild('form') form!: NgForm;
	isSaving: boolean = false;

	tblPropertyMaster$?: Observable<TblPropertyMaster[]>

	constructor(private tblPropertyService: TblPropertyService,
		private TblPropertyMasterService: TblPropertyMasterService,
		private TblPropertySharedService: TblPropertySharedservice,
		private router: Router, private toastr: ToastrService, private cdr: ChangeDetectorRef) {

		console.log('TblPropertyAddComponent CONSTRUCTOR');

		this.model = {
			fldId: 0,
			fldFKProperty: 0,
			fldSlNo: 0,
			fldDescription: '',
			fldShortName: '',
			fldSetAsDefault: true,
			fldIsActive: true,
			fldCreatedBy: 0,
			fldCreatedDt: new Date(),
		};
	}

	ngOnInit(): void {

		console.log('TblPropertyAddComponent ngOnInit');


		this.tblPropertyMaster$ = this.TblPropertyMasterService.getActiveLeanTblPropertyMasters();



		setTimeout(() => {
			if (this.form && this.form.controls['fldDescription']) {
				this.form.controls['fldDescription'].markAsTouched();
			}
		});
	}

	OnFormSubmit(
		form: NgForm,
		action: 'SaveAndAddNew' | 'SaveAndClose'): void {

		if (this.isSaving) {
			return;
		}

		this.submitAction = action;

		console.log('Form submitted with model:', this.model);


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

		this.isSaving = true;

		this.addTblPropertySubscription = this.tblPropertyService.addTblProperty(this.model)
			.subscribe({
				next: (response) => {
					// After successful save, refresh shared cache
					this.TblPropertySharedService.refreshProperties();

					this.isSaving = false;

					this.toastr.success('Record saved successfully!', 'Success', {
						toastClass: 'ngx-toastr custom-toast'
					});

					if (this.submitAction === 'SaveAndAddNew') {
						this.resetForm();
						this.cdr.detectChanges();
					} else {
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
			})
	}

	resetForm() {
		this.model = {
			fldId: 0,
			fldFKProperty: 0,
			fldSlNo: 0,
			fldDescription: '',
			fldShortName: '',
			fldSetAsDefault: true,
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
		this.router.navigateByUrl('mastertables/tblProperty');
	}

	ngOnDestroy(): void {
		this.addTblPropertySubscription?.unsubscribe();
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
