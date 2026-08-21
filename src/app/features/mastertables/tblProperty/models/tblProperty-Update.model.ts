export interface TblPropertyUpdate {
	fldId: number;
	fldFKProperty: number;
	fldSlNo: number;
	fldDescription: string;
	fldShortName: string;
	fldSetAsDefault: boolean;
	fldIsActive: boolean;
	fldCreatedBy: number;
	fldCreatedDt: Date;
	fldModifiedBy: number;
	fldModifiedDt: Date;
}
