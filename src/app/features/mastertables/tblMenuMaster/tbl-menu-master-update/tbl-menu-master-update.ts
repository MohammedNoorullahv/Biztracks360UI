import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


import {TblMenuMaster } from '../models/tblMenuMaster.model';
import {TblMenuMasterUpdate } from '../models/tblMenuMaster-Update.model';

import { TblProperty } from '../../tblProperty/models/tblProperty.model';
import { TblMenuMasterService } from '../services/tbl-menu-master';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';


@Component({
  selector: 'app-tbl-menu-master-update',
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './tbl-menu-master-update.html',
  styleUrl: './tbl-menu-master-update.css',
})

export class TblMenuMasterUpdateComponent implements OnInit, OnDestroy {
id: number | null = null;
paramSubscription?: Subscription;
private editTblMenuMasterSubscription?: Subscription;
private deleteTblMenuMasterSubscription?: Subscription;
tblMenuMaster?: TblMenuMasterUpdate;
actionType: string = '';
submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

@ViewChild('form') form!: NgForm;

tblPropertyAll$?: Observable<TblProperty[]>;

tblPropertyCategory$?: Observable<TblProperty[]>;

constructor(private tblMenuMasterService: TblMenuMasterService,
	private tblPropertyMasterService: TblPropertyMasterService,
	private tblPropertyService: TblPropertyService,
	private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
	private cdr: ChangeDetectorRef) {
}
ngOnInit(): void {
	// Declare constants upfront
	let nFldFKCategoryId: number | undefined;



	this.tblPropertyMasterService.getActiveTblPropertyMasters().subscribe(ids => {
		nFldFKCategoryId = ids.find(x => x.fldDescription === 'Category')?.fldId;
	});


	//Now load tblPropertyAll$ independently
	this.tblPropertyAll$ = this.tblPropertyService.getActiveTblPropertys();
	this.tblPropertyCategory$ = this.tblPropertyAll$.pipe(
		map(props => props.filter(p => p.fldFKProperty === nFldFKCategoryId))
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
				this.tblMenuMasterService.getTblMenuMasterById(this.id)
					.subscribe({
						next: (response) => {
							this.tblMenuMaster = response;
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

	if (!this.tblMenuMaster?.fldTableOrView?.trim()) {
		return;
	}

	if (!this.tblMenuMaster?.fldFKCategory || this.tblMenuMaster?.fldFKCategory <= 0) {
		return;
	}

	if (!this.tblMenuMaster?.fldCategory?.trim()) {
		return;
	}

	if (!this.tblMenuMaster?.fldMenuName?.trim()) {
		return;
	}

	if (!this.tblMenuMaster?.fldTableOrViewName?.trim()) {
		return;
	}

	const TblMenuMasterUpdateRequest: TblMenuMasterUpdate = {
		fldId: this.tblMenuMaster?.fldId ?? 0,
		fldTableOrView: this.tblMenuMaster?.fldTableOrView ?? '',
		fldFKCategory: this.tblMenuMaster?.fldFKCategory ?? 0,
		fldCategory: this.tblMenuMaster?.fldCategory ?? '',
		fldMenuName: this.tblMenuMaster?.fldMenuName ?? '',
		fldTableOrViewName: this.tblMenuMaster?.fldTableOrViewName ?? '',
		fldCondition: this.tblMenuMaster?.fldCondition ?? '',
		fldRoleOfTheMenu: this.tblMenuMaster?.fldRoleOfTheMenu ?? '',
		fldControllerName: this.tblMenuMaster?.fldControllerName ?? '',
		fldIcon: this.tblMenuMaster?.fldIcon ?? '',
		fldIsProcessProgram: this.tblMenuMaster?.fldIsProcessProgram ?? true,
		fldIsActive: this.tblMenuMaster?.fldIsActive ?? true,
		fldCreatedBy: this.tblMenuMaster?.fldCreatedBy ?? 0,
		fldCreatedDt: this.tblMenuMaster?.fldCreatedDt ?? new Date(),
		fldModifiedBy: this.tblMenuMaster?.fldModifiedBy ?? 0,
		fldModifiedDt: this.tblMenuMaster?.fldModifiedDt ?? new Date(),
	};

	if (this.id) {
		if (this.submitAction === 'Edit') {
			this.editTblMenuMasterSubscription = this.tblMenuMasterService.updateTblMenuMaster(TblMenuMasterUpdateRequest)
				.subscribe({
					next: (response) => {
						this.toastr.success('Record updated successfully!', 'Success', {
							toastClass: 'ngx-toastr custom-toast'
						});

						this.router.navigateByUrl('mastertables/tblMenuMaster');
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
				this.deleteTblMenuMasterSubscription = this.tblMenuMasterService.deleteTblMenuMaster(TblMenuMasterUpdateRequest)
					.subscribe({
						next: (response) => {
							if (response.status === 200) {
								this.toastr.success('Record deleted successfully!', 'Success', {
									toastClass: 'ngx-toastr custom-toast'
								});

								this.router.navigateByUrl('mastertables/tblMenuMaster');
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


onSelectChange(event: Event, targetField: keyof TblMenuMaster): void {
	const selectElement = event.target as HTMLSelectElement;
	const selectedText = selectElement.options[selectElement.selectedIndex].text;

	// Assign the text to the correct field ()
	(this.tblMenuMaster as any)[targetField] = selectedText;
}

backToHome(): void {
	this.router.navigateByUrl('mastertables/tblMenuMaster');
}

ngOnDestroy(): void {
	this.paramSubscription?.unsubscribe();
	this.editTblMenuMasterSubscription?.unsubscribe();
	this.deleteTblMenuMasterSubscription?.unsubscribe();
}

isFormValid(form: any): boolean {

if (form.invalid) {
	return false;
}

if (!this.tblMenuMaster?.fldTableOrView?.trim()) {
	return false;
}

if (!this.tblMenuMaster?.fldFKCategory || this.tblMenuMaster?.fldFKCategory <= 0) {
	return false;
}

if (!this.tblMenuMaster?.fldCategory?.trim()) {
	return false;
}

if (!this.tblMenuMaster?.fldMenuName?.trim()) {
	return false;
}

if (!this.tblMenuMaster?.fldTableOrViewName?.trim()) {
	return false;
}

	return true;
}


}
