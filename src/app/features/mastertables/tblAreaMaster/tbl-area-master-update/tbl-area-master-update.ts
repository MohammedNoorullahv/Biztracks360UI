import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


import { TblAreaMaster } from '../models/tblAreaMaster.model';
import { TblAreaMasterUpdate } from '../models/tblAreaMaster-Update.model';

import { TblProperty } from '../../tblProperty/models/tblProperty.model';

import { TblStateMaster } from '../../tblStateMaster/models/tblStateMaster.model';
import { TblAreaMasterService } from '../services/tbl-area-master';
import { TblPropertyMasterService } from '../../tblPropertyMaster/services/tbl-property-master';
import { TblPropertyService } from '../../tblProperty/services/tbl-property';
import { TblStateMasterService } from '../../tblStateMaster/services/tbl-state-master';

@Component({
	selector: 'app-tbl-area-master-update',
	imports: [CommonModule, FormsModule],
	templateUrl: './tbl-area-master-update.html',
	styleUrl: './tbl-area-master-update.css',
})

export class TblAreaMasterUpdateComponent implements OnInit, OnDestroy {
	id: number | null = null;
	paramSubscription?: Subscription;
	private editTblAreaMasterSubscription?: Subscription;
	private deleteTblAreaMasterSubscription?: Subscription;
	tblAreaMaster?: TblAreaMasterUpdate;
	actionType: string = '';
	submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

	@ViewChild('form') form!: NgForm;

	tblPropertyAll$?: Observable<TblProperty[]>;

	tblStateMaster$?: Observable<TblStateMaster[]>
	tblPropertyCity$?: Observable<TblProperty[]>;
	tblPropertyArea$?: Observable<TblProperty[]>;
	tblPropertyPincode$?: Observable<TblProperty[]>;

	constructor(private tblAreaMasterService: TblAreaMasterService,
		private tblPropertyMasterService: TblPropertyMasterService,
		private tblPropertyService: TblPropertyService,
		private tblStateMasterService: TblStateMasterService,
		private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
		private cdr: ChangeDetectorRef) {
	}
	ngOnInit(): void {
		// Declare constants upfront
		let nFldFKCityId: number | undefined;
		let nFldFKAreaId: number | undefined;
		let nFldFKPincodeId: number | undefined;


		this.tblStateMaster$ = this.tblStateMasterService.getActiveTblStateMasters();

		this.tblPropertyMasterService.getActiveTblPropertyMasters().subscribe(ids => {
			nFldFKCityId = ids.find(x => x.fldDescription === 'City')?.fldId;
			nFldFKAreaId = ids.find(x => x.fldDescription === 'Area')?.fldId;
			nFldFKPincodeId = ids.find(x => x.fldDescription === 'Pincode')?.fldId;
		});


		//Now load tblPropertyAll$ independently
		this.tblPropertyAll$ = this.tblPropertyService.getActiveTblPropertys();
		this.tblPropertyCity$ = this.tblPropertyAll$.pipe(
			map(props => props.filter(p => p.fldFKProperty === nFldFKCityId))
		);

		this.tblPropertyArea$ = this.tblPropertyAll$.pipe(
			map(props => props.filter(p => p.fldFKProperty === nFldFKAreaId))
		);

		this.tblPropertyPincode$ = this.tblPropertyAll$.pipe(
			map(props => props.filter(p => p.fldFKProperty === nFldFKPincodeId))
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
					this.tblAreaMasterService.getTblAreaMasterById(this.id)
						.subscribe({
							next: (response) => {
								this.tblAreaMaster = response;
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

		if (!this.tblAreaMaster?.fldFKState || this.tblAreaMaster?.fldFKState <= 0) {
			return;
		}

		if (!this.tblAreaMaster?.fldFKCity || this.tblAreaMaster?.fldFKCity <= 0) {
			return;
		}

		if (!this.tblAreaMaster?.fldFKArea || this.tblAreaMaster?.fldFKArea <= 0) {
			return;
		}

		if (!this.tblAreaMaster?.fldFKPincode || this.tblAreaMaster?.fldFKPincode <= 0) {
			return;
		}

		const TblAreaMasterUpdateRequest: TblAreaMasterUpdate = {
			fldId: this.tblAreaMaster?.fldId ?? 0,
			fldFKState: this.tblAreaMaster?.fldFKState ?? 0,
			fldState: this.tblAreaMaster?.fldState ?? '',
			fldFKCity: this.tblAreaMaster?.fldFKCity ?? 0,
			fldCity: this.tblAreaMaster?.fldCity ?? '',
			fldFKArea: this.tblAreaMaster?.fldFKArea ?? 0,
			fldArea: this.tblAreaMaster?.fldArea ?? '',
			fldFKPincode: this.tblAreaMaster?.fldFKPincode ?? 0,
			fldPincode: this.tblAreaMaster?.fldPincode ?? '',
			fldStateCode: this.tblAreaMaster?.fldStateCode ?? 0,
			fldStateShortCode: this.tblAreaMaster?.fldStateShortCode ?? '',
			fldIsActive: this.tblAreaMaster?.fldIsActive ?? true,
			fldCreatedBy: this.tblAreaMaster?.fldCreatedBy ?? 0,
			fldCreatedDt: this.tblAreaMaster?.fldCreatedDt ?? new Date(),
			fldModifiedBy: this.tblAreaMaster?.fldModifiedBy ?? 0,
			fldModifiedDt: this.tblAreaMaster?.fldModifiedDt ?? new Date(),
		};

		if (this.id) {
			if (this.submitAction === 'Edit') {
				this.editTblAreaMasterSubscription = this.tblAreaMasterService.updateTblAreaMaster(TblAreaMasterUpdateRequest)
					.subscribe({
						next: (response) => {
							this.toastr.success('Record updated successfully!', 'Success', {
								toastClass: 'ngx-toastr custom-toast'
							});

							this.router.navigateByUrl('mastertables/tblAreaMaster');
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
					this.deleteTblAreaMasterSubscription = this.tblAreaMasterService.deleteTblAreaMaster(TblAreaMasterUpdateRequest)
						.subscribe({
							next: (response) => {
								if (response.status === 200) {
									this.toastr.success('Record deleted successfully!', 'Success', {
										toastClass: 'ngx-toastr custom-toast'
									});

									this.router.navigateByUrl('mastertables/tblAreaMaster');
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

	onSelectChange(event: Event, targetField: keyof TblAreaMaster): void {
		const selectElement = event.target as HTMLSelectElement;
		const selectedText = selectElement.options[selectElement.selectedIndex].text;

		// Assign the text to the correct field ()
		(this.tblAreaMaster as any)[targetField] = selectedText;
	}

	backToHome(): void {
		this.router.navigateByUrl('mastertables/tblAreaMaster');
	}

	ngOnDestroy(): void {
		this.paramSubscription?.unsubscribe();
		this.editTblAreaMasterSubscription?.unsubscribe();
		this.deleteTblAreaMasterSubscription?.unsubscribe();
	}

	isFormValid(form: any): boolean {

		if (form.invalid) {
			return false;
		}

		if (!this.tblAreaMaster?.fldFKState || this.tblAreaMaster?.fldFKState <= 0) {
			return false;
		}

		if (!this.tblAreaMaster?.fldFKCity || this.tblAreaMaster?.fldFKCity <= 0) {
			return false;
		}

		if (!this.tblAreaMaster?.fldFKArea || this.tblAreaMaster?.fldFKArea <= 0) {
			return false;
		}

		if (!this.tblAreaMaster?.fldFKPincode || this.tblAreaMaster?.fldFKPincode <= 0) {
			return false;
		}


		return true;
	}


}

