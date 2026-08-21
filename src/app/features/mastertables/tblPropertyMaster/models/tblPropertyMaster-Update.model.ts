export interface TblPropertyMasterUpdate {
	fldId: number;
	fldSlNo: number;
	fldDescription: string;
	fldShortName: string;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
	fldIsEditAllowed: boolean;
	fldIsDeleteAllowed: boolean;
}