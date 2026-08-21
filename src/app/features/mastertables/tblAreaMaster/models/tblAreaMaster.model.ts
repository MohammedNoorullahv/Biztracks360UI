export interface TblAreaMaster {
	fldId: number;
	fldFKState: number;
	fldState: string;
	fldFKCity: number;
	fldCity: string;
	fldFKArea: number;
	fldArea: string;
	fldFKPincode: number;
	fldPincode: string;
	fldStateCode: number;
	fldStateShortCode: string;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
	fldDeletedBy: number;
	fldDeletedDt: Date;
}
