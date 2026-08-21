import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { TblPropertyMasterUpdate } from '../models/tblPropertyMaster-Update.model';
import { TblPropertyMasterService } from '../services/tbl-property-master';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
	selector: 'app-tbl-property-master-update',
	imports: [CommonModule, FormsModule],
	templateUrl: './tbl-property-master-update.html',
	styleUrl: './tbl-property-master-update.css',
})

export class TblPropertyMasterUpdateComponent implements OnInit, OnDestroy {
	id: number | null = null;
	paramSubscription?: Subscription;
	private editTblPropertyMasterSubscription?: Subscription;
	private deleteTblPropertyMasterSubscription?: Subscription;
	tblPropertyMaster?: TblPropertyMasterUpdate;
	actionType: string = '';
	submitAction: 'Edit' | 'Delete' = 'Edit'; // default to Edit

	@ViewChild('form') form!: NgForm;

	constructor(private tblPropertyMasterService: TblPropertyMasterService,
		private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
		private cdr: ChangeDetectorRef) {
	}

	// ngOnInit(): void {
	// 	this.paramSubscription = this.route.paramMap.subscribe({
	// 		next: (params) => {
	// 			const idParam = this.route.snapshot.paramMap.get('id');
	// 			this.id = idParam ? parseInt(idParam, 10) : null;

	//       if (this.id) {
	// 				this.route.queryParams.subscribe(params => {
	// 					this.actionType = params['action'];
	// 				});

	// 				this.tblPropertyMasterService.getTblPropertyMasterById(this.id)
	// 					.subscribe({
	// 						next: (response) => {
	// 							this.tblPropertyMaster = response;
	// 						}
	// 					});
	// 			}
	// 		}
	// 	});
	// }

	ngOnInit(): void {
		console.log('1. ngOnInit fired');

		this.paramSubscription = combineLatest([
			this.route.paramMap,
			this.route.queryParams
		]).subscribe(([params, queryParams]) => {
			console.log('2. combineLatest emitted', params, queryParams);

			const idParam = params.get('id');           // <-- use emitted params, not snapshot
			this.id = idParam ? parseInt(idParam, 10) : null;
			this.actionType = queryParams['action'];

			console.log('3. resolved id =', this.id, 'actionType =', this.actionType);

			if (this.id) {
				this.tblPropertyMasterService.getTblPropertyMasterById(this.id)
					.subscribe({
						next: (response) => {
							console.log('4. API response received', response);
							this.tblPropertyMaster = response;
							this.cdr.detectChanges();
							console.log('5. tblPropertyMaster assigned', this.tblPropertyMaster);
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

		if (!this.tblPropertyMaster?.fldSlNo || this.tblPropertyMaster?.fldSlNo <= 0) {
			return;
		}

		if (!this.tblPropertyMaster?.fldDescription?.trim()) {
			return;
		}

		if (!this.tblPropertyMaster?.fldShortName?.trim()) {
			return;
		}

		const TblPropertyMasterUpdateRequest: TblPropertyMasterUpdate = {
			fldId: this.tblPropertyMaster?.fldId ?? 0,
			fldSlNo: this.tblPropertyMaster?.fldSlNo ?? 0,
			fldDescription: this.tblPropertyMaster?.fldDescription ?? '',
			fldShortName: this.tblPropertyMaster?.fldShortName ?? '',
			fldIsActive: this.tblPropertyMaster?.fldIsActive ?? true,
			fldCreatedBy: this.tblPropertyMaster?.fldCreatedBy ?? 0,
			fldCreatedDt: this.tblPropertyMaster?.fldCreatedDt ?? new Date(),
			fldModifiedBy: this.tblPropertyMaster?.fldModifiedBy ?? 0,
			fldModifiedDt: this.tblPropertyMaster?.fldModifiedDt ?? new Date(),
			fldIsEditAllowed: this.tblPropertyMaster?.fldIsEditAllowed ?? true,
			fldIsDeleteAllowed: this.tblPropertyMaster?.fldIsDeleteAllowed ?? true,
		}
		if (this.id) {
			if (this.submitAction === 'Edit') {
				this.editTblPropertyMasterSubscription = this.tblPropertyMasterService.updateTblPropertyMaster(TblPropertyMasterUpdateRequest)
					.subscribe({
						next: (Response) => {
							this.router.navigateByUrl('mastertables/tblPropertyMaster');
						}
					});
			} else {
				const proceed = confirm('R U Sure, U Want to Delete the selected Record?');

				if (proceed) {
					this.deleteTblPropertyMasterSubscription = this.tblPropertyMasterService.deleteTblPropertyMaster(TblPropertyMasterUpdateRequest)
						.subscribe({
							next: (response) => {
								if (response.status === 200) {
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
						});
				}
			}
		}
	}

	backToHome(): void {
		this.router.navigateByUrl('mastertables/tblPropertyMaster');
	}

	ngOnDestroy(): void {
		this.paramSubscription?.unsubscribe();
		this.editTblPropertyMasterSubscription?.unsubscribe();
		this.deleteTblPropertyMasterSubscription?.unsubscribe();
	}

	isFormValid(form: any): boolean {

		if (form.invalid) {
			return false;
		}

		if (!this.tblPropertyMaster?.fldSlNo || this.tblPropertyMaster?.fldSlNo <= 0) {
			return false;
		}

		if (!this.tblPropertyMaster?.fldDescription?.trim()) {
			return false;
		}

		if (!this.tblPropertyMaster?.fldShortName?.trim()) {
			return false;
		}

		return true;
	}

}
