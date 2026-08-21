import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { TblStateMasterService } from '../services/tbl-state-master';
import { TblStateMasterAdd } from '../models/tblStateMaster-Add.model';


@Component({
	selector: 'app-tbl-state-master-add',
	imports: [
		CommonModule, FormsModule
	],
	templateUrl: './tbl-state-master-add.html',
	styleUrl: './tbl-state-master-add.css',
})

export class TblStateMasterAddComponent implements OnDestroy {
	model: TblStateMasterAdd;
	submitAction: 'SaveAndAddNew' | 'SaveAndClose' | 'exit' = 'exit'; // default to exit
	private addTblStateMasterSubscription?: Subscription;
	@ViewChild('form') form!: NgForm;

	constructor(private tblStateMasterService: TblStateMasterService,
		private router: Router, private toastr: ToastrService,
		private cdr: ChangeDetectorRef) {
		this.model = {
			fldId: 0,
			fldStateName: '',
			fldStateCode: '',
			fldShortName: '',
			fldIsActive: true,
			fldCreatedBy: 0,
			fldCreatedDt: new Date(),
		};
	}

	ngOnInit(): void {
	}

	OnFormSubmit() {
		this.addTblStateMasterSubscription = this.tblStateMasterService.addTblStateMaster(this.model)
			.subscribe({
				next: (response) => {
					this.toastr.success('Record saved successfully!', 'Success', {
						toastClass: 'ngx-toastr custom-toast'
					});

					if (this.submitAction === 'SaveAndAddNew') {
						this.resetForm();
						this.cdr.detectChanges();
					} else {
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
			})
	}

	resetForm() {
		this.model = {
			fldId: 0,
			fldStateName: '',
			fldStateCode: '',
			fldShortName: '',
			fldIsActive: true,
			fldCreatedBy: 0,
			fldCreatedDt: new Date(),
		},
			setTimeout(() => {
				const firstInput = document.getElementById('fldStateName');
				if (firstInput) {
					firstInput.focus();
				}
			});
	}

	backToHome(): void {
		this.router.navigateByUrl('mastertables/tblStateMaster');
	}

	ngOnDestroy(): void {
		this.addTblStateMasterSubscription?.unsubscribe();
	}

}

